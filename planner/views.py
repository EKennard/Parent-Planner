from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.db.models import Case, When, Value, DateField, Count, Q
from .forms import registrationForm, childForm, entryForm, noteForm
from .models import Parent, Child, Entry, Category
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages

# Create your views here.

#---------------find parent or redirect-------------------
def get_parent_or_redirect(request):
    try:
        return Parent.objects.get(user=request.user)
    except Parent.DoesNotExist:
        # For onboarding flow, create Parent object automatically
        if request.GET.get('onboarding') == 'true' or request.POST.get('onboarding') == 'true':
            parent = Parent.objects.create(user=request.user)
            return parent
        else:
            messages.error(request, 'Access denied.')
            return None


# ----------------------------home view----------------------------
def home(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    return render(request, 'landing.html')

# DEPRECATED: Custom registration view - using allauth instead
# def registration(request):
#     if request.method == 'POST':
#         form = registrationForm(request.POST)
#         if form.is_valid():
#             user = form.save()
#             login(request, user)
#             # Start onboarding with first child creation
#             return redirect('add_child') + '?onboarding=true'
#     else:
#         form = registrationForm()
#     return render(request, 'registration/registration.html', {'form': form})


#-----------------------------dashboard view---------------------------------
@login_required
def dashboard(request):
    parent, _ = Parent.objects.get_or_create(user=request.user)
    
    # Clear any old messages on fresh dashboard access (e.g. after login)
    # This prevents messages from previous users/sessions from persisting
    if request.method == 'GET' and not request.GET.get('page'):
        storage = messages.get_messages(request)
        list(storage)  # This clears the messages
    
    # Optimized queries with select_related for better performance
    children = Child.objects.filter(parent=parent).order_by('name')
    children_count = children.count()
    
    # Adaptive dashboard logic based on child count
    dashboard_mode = 'empty'  # 0 children
    if children_count == 1:
        dashboard_mode = 'single_child'
    elif children_count >= 2:
        dashboard_mode = 'multi_child'
    
    # Optimized entry query - only fetch what we need with select_related
    all_entries = Entry.objects.filter(child__parent=parent)\
        .select_related('child')\
        .order_by('-created_at')
    
    # Handle filtering by entry type (for All/Tasks/Events buttons)
    entry_type_filter = request.GET.get('type', '')
    if entry_type_filter == 'task':
        filtered_entries = all_entries.filter(entry_type='task').order_by(
            'is_completed',  # Incomplete tasks first
            Case(
                When(task_due_date__isnull=True, then=Value('9999-12-31')),
                default='task_due_date',
                output_field=DateField(),
            ),
            'task_due_time',
            'created_at'
        )
    elif entry_type_filter == 'event':
        filtered_entries = all_entries.filter(entry_type='event').order_by(
            Case(
                When(event_date__isnull=True, then=Value('9999-12-31')),
                default='event_date',
                output_field=DateField(),
            ),
            'event_start_time',
            'created_at'  # Changed from -created_at to put newer events with same date first
        )
    else:
        # 'All' or no filter - exclude notes from main timeline
        filtered_entries = all_entries.exclude(entry_type='note')
    
    # Handle entry form submission
    if request.method == 'POST' and 'add_entry' in request.POST:
        form = entryForm(request.POST, parent=parent)
        if form.is_valid():
            entry = form.save()
            messages.success(request, f'Added {entry.get_entry_type_display().lower()}: {entry.title}')
            return redirect('dashboard')
    else:
        # Pre-select child for single child mode
        if dashboard_mode == 'single_child':
            form = entryForm(parent=parent, initial={'child': children.first()})
        else:
            form = entryForm(parent=parent)
    
    # Handle note form submission
    if request.method == 'POST' and 'add_note' in request.POST:
        note_form = noteForm(request.POST, parent=parent)
        if note_form.is_valid():
            note = note_form.save()
            messages.success(request, 'Note added successfully!')
            return redirect('dashboard')
    else:
        # Pre-select child for single child mode
        if dashboard_mode == 'single_child':
            note_form = noteForm(parent=parent, initial={'child': children.first()})
        else:
            note_form = noteForm(parent=parent)
    
    # Handle child form submission
    if request.method == 'POST' and 'add_child' in request.POST:
        child_form = childForm(request.POST)
        if child_form.is_valid():
            child = child_form.save(commit=False)
            child.parent = parent
            child.save()
            messages.success(request, f'Added {child.name} to your family!')
            return redirect('dashboard')
    else:
        child_form = childForm()
    
    # Limit entries for better performance - only show recent entries on dashboard
    active_entries = filtered_entries[:20]
    
    # DEBUG: Print what we're getting
    print(f"DEBUG: filtered_entries count = {filtered_entries.count()}")
    print(f"DEBUG: active_entries count = {len(active_entries)}")
    for entry in active_entries[:5]:  # Print first 5
        print(f"  - {entry.title} ({entry.entry_type})")
    
    # Get recent notes for the notes section - limit to 15, ordered by most recently updated
    notes = all_entries.filter(entry_type='note').order_by('-updated_at')[:15]
    
    # Get tasks and events separately for the new 4-section layout
    # Order tasks by incomplete first, then by due date (soonest first)
    tasks = all_entries.filter(entry_type='task').order_by(
        'is_completed',  # Incomplete tasks first
        Case(
            When(task_due_date__isnull=True, then=Value('9999-12-31')),
            default='task_due_date',
            output_field=DateField(),
        ),
        'task_due_time',
        'created_at'
    )[:20]
    
    # Order events by upcoming dates first (closest dates to today at top)
    # Events with dates come first, sorted by date ascending (soonest first)
    # Events without dates come after, sorted by creation date descending (newest first)
    events = all_entries.filter(entry_type='event').order_by(
        Case(
            When(event_date__isnull=True, then=Value('9999-12-31')),
            default='event_date',
            output_field=DateField(),
        ),
        'event_start_time',
        'created_at'  # Changed from -created_at to put newer events with same date first
    )[:20]
    
    # Keep timeline entries for backward compatibility (now events only)
    timeline_entries = events
    
    # Efficient counting using database aggregation
    entry_counts = all_entries.aggregate(
        total=Count('id'),
        notes=Count('id', filter=Q(entry_type='note')),
        tasks=Count('id', filter=Q(entry_type='task')),
        events=Count('id', filter=Q(entry_type='event'))
    )
    
    context = {
        'parent': parent,
        'children': children,
        'children_count': children_count,
        'dashboard_mode': dashboard_mode,
        'primary_child': children.first() if children_count == 1 else None,
        'active_entries': active_entries,
        'entries': timeline_entries,  # For events section - events only
        'tasks': tasks,  # For tasks section - tasks only
        'events': events,  # For events section - events only  
        'total_entries': entry_counts['total'],
        'notes_count': entry_counts['notes'],
        'tasks_count': entry_counts['tasks'],
        'events_count': entry_counts['events'],
        'form': form,
        'note_form': note_form,
        'child_form': child_form,
        'notes': notes,  # For notes section - notes only
    }
    return render(request, 'dashboard.html', context)


#-----------add child view----------------------------
@login_required
def add_child(request):
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('account_signup')
    
    # Check if this is onboarding flow
    is_onboarding = request.GET.get('onboarding') == 'true' or request.POST.get('onboarding') == 'true'
    
    # Clear messages on GET request for onboarding
    if request.method == 'GET' and is_onboarding:
        list(messages.get_messages(request))
    
    if request.method == 'POST':
        form = childForm(request.POST)
        print(f"DEBUG: Form data received: {request.POST}")
        if form.is_valid():
            child = form.save(commit=False)
            child.parent = parent
            print(f"DEBUG: About to save child with name: '{child.name}'")
            # TEMPORARY FIX: If name is empty, use a default
            if not child.name or child.name.strip() == '':
                child.name = request.POST.get('name', 'Test Child')
                print(f"DEBUG: Name was empty, setting to: '{child.name}'")
            child.save()
            print(f"DEBUG: Child created with name: '{child.name}'")
            
            if is_onboarding:
                messages.success(request, f'Child profile for {child.name} created successfully!')
                return redirect('onboarding_decision', child_id=child.id)
            else:
                messages.success(request, f'Added {child.name}!')
                return redirect('dashboard')
        else:
            print(f"DEBUG: Form is not valid. Errors: {form.errors}")
            print(f"DEBUG: Form cleaned_data: {getattr(form, 'cleaned_data', 'No cleaned data')}")
            messages.error(request, 'Please correct the errors below.')
    else:
        form = childForm()
    
    return render(request, 'planner/addChild.html', {
        'form': form, 
        'is_onboarding': is_onboarding
    })


@login_required 
def onboarding_decision(request, child_id):
    """
    Decision dialogue: Add another child or continue to dashboard
    """
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
    
    child = get_object_or_404(Child, id=child_id, parent=parent)
    children = Child.objects.filter(parent=parent).order_by('name')
    
    context = {
        'child': child,
        'children': children,
        'children_count': children.count()
    }
    return render(request, 'planner/onboarding_decision.html', context)


#-----------------------add entry view----------------------------
@login_required
def add_entry(request):
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
    children = Child.objects.filter(parent=parent)
    if not children.exists():
        messages.error(request, 'You need to add at least one child profile before creating entries.')
        return redirect('add_child')
    
    # Check if child_id is provided (from child page or single-child dashboard)
    child_id = request.GET.get('child_id')
    initial_child = None
    if child_id:
        try:
            initial_child = children.get(id=child_id)
        except Child.DoesNotExist:
            pass  # Invalid child_id, ignore and let user select
    
    if request.method == 'POST':
        form = entryForm(request.POST, parent=parent)
        if form.is_valid():
            entry = form.save()
            entry_type = entry.get_entry_type_display().lower()
            messages.success(request, f'Added {entry_type} for {entry.child.name}!')
            return redirect('child_entries', child_id=entry.child.id)
        else:
            # Add error message when form validation fails
            print("Form errors:", form.errors)  # Debug print
            print("Form data:", request.POST)  # Debug print
            messages.error(request, 'Please correct the errors below and try again.')
    else:
        # Pre-select child if coming from child page
        if initial_child:
            form = entryForm(parent=parent, initial={'child': initial_child})
        else:
            form = entryForm(parent=parent)
    
    context = {
        'form': form,
        'initial_child': initial_child,  # Pass to template for context
    }
    return render(request, 'planner/addEntry.html', context)


#-----------------------child entries view----------------------------
@login_required
def child_entries(request, child_id):
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
    child = get_object_or_404(Child, id=child_id, parent=parent)
    
    # Handle note creation separately
    if request.method == 'POST' and 'add_note' in request.POST:
        note_form = noteForm(request.POST, parent=parent)
        if note_form.is_valid():
            note = note_form.save()
            messages.success(request, f'Added note for {child.name}!')
            return redirect('child_entries', child_id=child.id)
    else:
        note_form = noteForm(parent=parent, initial={'child': child})
    
    # Handle regular entry creation
    if request.method == 'POST' and 'add_entry' in request.POST:
        form = entryForm(request.POST, parent=parent)
        if form.is_valid():
            entry = form.save()
            messages.success(request, f'Added {entry.get_entry_type_display().lower()} for {child.name}!')
            return redirect('child_entries', child_id=child.id)
    else:
        form = entryForm(parent=parent, initial={'child': child})
    
    # Get all entries excluding notes
    entries = Entry.objects.filter(child=child).exclude(entry_type='note').defer('is_completed').order_by('-created_at')
    
    # Separate tasks and events for the new layout
    # Order tasks by incomplete first, then by due date (soonest first)
    tasks = Entry.objects.filter(child=child, entry_type='task').order_by(
        'is_completed',  # Incomplete tasks first
        Case(
            When(task_due_date__isnull=True, then=Value('9999-12-31')),
            default='task_due_date',
            output_field=DateField(),
        ),
        'task_due_time',
        'created_at'
    )
    
    # Order events by upcoming dates first (closest dates to today at top)
    events = Entry.objects.filter(child=child, entry_type='event').order_by(
        Case(
            When(event_date__isnull=True, then=Value('9999-12-31')),
            default='event_date',
            output_field=DateField(),
        ),
        'event_start_time',
        'created_at'  # Changed from -created_at to put newer events with same date first
    )
    
    # Get notes separately, ordered by most recently updated first
    notes = Entry.objects.filter(child=child, entry_type='note').order_by('-updated_at')
    
    return render(request, 'planner/childEntries.html', {
        'child': child,
        'form': form,
        'note_form': note_form,
        'entries': entries,
        'tasks': tasks,
        'events': events,
        'notes': notes,
        'categories': Category.objects.all(),
    })



#---------------------------------edit entry view----------------------------
@login_required
def edit_entry(request, entry_id):
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
    entry = get_object_or_404(Entry.objects.defer('is_completed'), id=entry_id, child__parent=parent)
    
    # Get the 'next' parameter from GET (initial load) or POST (form submission)
    next_url = request.GET.get('next') or request.POST.get('next')
    
    if request.method == 'POST':
        form = entryForm(request.POST, instance=entry, parent=parent)
        if form.is_valid():
            form.save()
            messages.success(request, f'Updated {entry.get_entry_type_display().lower()}: {entry.title}')
            
            # Redirect based on 'next' parameter or default to child_entries
            if next_url == 'dashboard':
                return redirect('dashboard')
            else:
                return redirect('child_entries', child_id=entry.child.id)
    else:
        form = entryForm(instance=entry, parent=parent)
        
    return render(request, 'planner/editEntry.html', {
        'form': form,
        'entry': entry,
        'child': entry.child,
        'next_url': next_url,  # Pass to template for form action
    })


#---------------------------------save entry view (for modal forms)----------------------------
@login_required
def save_entry(request, entry_id):
    """AJAX endpoint to save entry from modal forms and return to dashboard"""
    if request.method != 'POST':
        return redirect('dashboard')
        
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
        
    entry = get_object_or_404(Entry, id=entry_id, child__parent=parent)
    form = entryForm(request.POST, instance=entry, parent=parent)
    
    if form.is_valid():
        form.save()
        messages.success(request, f'Updated {entry.get_entry_type_display().lower()}: {entry.title}')
    else:
        messages.error(request, 'Please correct the errors in the form.')
        
    return redirect('dashboard')


#-----------------------delete entry view----------------------------
@login_required
def delete_entry(request, entry_id, redirect_to='child_entries'):
    """
    Delete an entry and redirect based on context.
    redirect_to: 'child_entries' for child profile page, 'dashboard' for dashboard
    """
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
    entry = get_object_or_404(Entry.objects.defer('is_completed'), id=entry_id, child__parent=parent)
    child_id = entry.child.id
    if request.method == 'POST':
        entry_title = entry.title
        entry_type = entry.get_entry_type_display()
        entry.delete()
        messages.success(request, f'Deleted {entry_type.lower()}: {entry_title}')
    
    if redirect_to == 'dashboard':
        return redirect('dashboard')
    else:
        return redirect('child_entries', child_id=child_id)

#----------------------edit child view----------------------------

@login_required
def edit_child(request, child_id):
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
    child = get_object_or_404(Child, id=child_id, parent=parent)
    if request.method == 'POST':
        form = childForm(request.POST, instance=child)
        if form.is_valid():
            form.save()
            messages.success(request, f'Updated {child.name}!')
            return redirect('dashboard')
    else:
        form = childForm(instance=child)
    return render(request, 'planner/editChild.html', {
        'form': form,
        'child': child,
    })


#---------------------------------save child view (for modal forms)----------------------------
@login_required
def save_child(request, child_id):
    """AJAX endpoint to save child from modal forms and return to dashboard"""
    if request.method != 'POST':
        return redirect('dashboard')
        
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
        
    child = get_object_or_404(Child, id=child_id, parent=parent)
    form = childForm(request.POST, instance=child)
    
    if form.is_valid():
        form.save()
        messages.success(request, f'Updated {child.name}!')
    else:
        messages.error(request, 'Please correct the errors in the form.')
        
    return redirect('dashboard')


#----------------------delete child view----------------------------
@login_required
def delete_child(request, child_id):
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
    child = get_object_or_404(Child, id=child_id, parent=parent)
    
    if request.method == 'POST':
        child_name = child.name
        child.delete()  # This will cascade delete all related entries
        messages.success(request, f'{child_name}\'s profile and all associated entries have been deleted.')
        return redirect('dashboard')
    
    # If not POST, redirect back to edit page
    messages.error(request, 'Invalid request.')
    return redirect('edit_child', child_id=child_id)


#----------------------- entry completion view----------------------------
@login_required
def toggle_entry_completion(request, entry_id):
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
    entry = get_object_or_404(Entry.objects.defer('is_completed'), id=entry_id, child__parent=parent)
    messages.info(request, f'Completion toggle temporarily disabled for "{entry.title}". Database update needed.')
    return redirect('dashboard')

#----------------delete entry view----------------------------
@login_required
def quick_delete_entry(request, entry_id):
    """Quick delete entry from dashboard - redirects back to dashboard"""
    return delete_entry(request, entry_id, redirect_to='dashboard')


def logout_view(request):
    """Log out the user and redirect to home page"""
    logout(request)
    messages.success(request, 'You have been successfully logged out.')
    return redirect('home')


#-----------------------------UNIFIED DASHBOARD VIEW---------------------------------
@login_required
def unified_dashboard(request, child_id=None):
    """
    Unified view that handles both dashboard (child_id=None) and child profile (child_id provided) modes.
    Uses the same template with different context to ensure 100% consistency.
    """
    parent, _ = Parent.objects.get_or_create(user=request.user)
    
    # Determine mode and get child if in child mode
    child = None
    if child_id:
        child = get_object_or_404(Child, id=child_id, parent=parent)
    
    # Handle note form submission
    if request.method == 'POST' and 'add_note' in request.POST:
        note_form = noteForm(request.POST, parent=parent)
        if note_form.is_valid():
            note = note_form.save()
            if child:
                messages.success(request, f'Added note for {child.name}!')
                return redirect('unified_child_view', child_id=child.id)
            else:
                messages.success(request, 'Note added successfully!')
                return redirect('unified_dashboard')
    else:
        if child:
            note_form = noteForm(parent=parent, initial={'child': child})
        else:
            note_form = noteForm(parent=parent)

    # Handle regular entry creation
    if request.method == 'POST' and 'add_entry' in request.POST:
        form = entryForm(request.POST, parent=parent)
        if form.is_valid():
            entry = form.save()
            if child:
                messages.success(request, f'Added {entry.get_entry_type_display().lower()} for {child.name}!')
                return redirect('unified_child_view', child_id=child.id)
            else:
                messages.success(request, f'Added {entry.get_entry_type_display().lower()}!')
                return redirect('unified_dashboard')
    else:
        if child:
            form = entryForm(parent=parent, initial={'child': child})
        else:
            form = entryForm(parent=parent)

    # Get children
    if child:
        children = [child]  # Only this child for child mode
    else:
        children = Child.objects.filter(parent=parent)  # All children for dashboard mode

    # Get entries based on mode
    if child:
        # Child mode: Only entries for this child
        all_entries = Entry.objects.filter(child=child).defer('is_completed')
        entries = all_entries.exclude(entry_type='note').order_by('-created_at')
        notes = all_entries.filter(entry_type='note').order_by('-updated_at')
    else:
        # Dashboard mode: All entries for all children
        all_entries = Entry.objects.filter(child__parent=parent).defer('is_completed')
        entries = all_entries.exclude(entry_type='note').order_by('-created_at')
        notes = all_entries.filter(entry_type='note').order_by('-updated_at')

    # Apply filtering for entries
    entry_type_filter = request.GET.get('type')
    if entry_type_filter in ['task', 'event']:
        entries = entries.filter(entry_type=entry_type_filter)

    # Calculate counts
    total_entries = all_entries.count()
    notes_count = notes.count()
    tasks_count = all_entries.filter(entry_type='task').count()
    events_count = all_entries.filter(entry_type='event').count()

    context = {
        'parent': parent,
        'child': child,  # None for dashboard mode, Child object for child mode
        'children': children,
        'entries': entries,  # Timeline entries (no notes)
        'notes': notes,  # Notes only
        'active_entries': entries,  # For backward compatibility
        'total_entries': total_entries,
        'notes_count': notes_count,
        'tasks_count': tasks_count,
        'events_count': events_count,
        'form': form,
        'note_form': note_form,
        'entry_type_filter': entry_type_filter,
        'categories': Category.objects.all(),
    }
    
    return render(request, 'unified_dashboard.html', context)


@login_required
@require_http_methods(["POST"])
def toggle_task_completion(request, task_id):
    """Toggle task completion status via AJAX"""
    print(f"Toggle task completion called for task_id: {task_id}")
    try:
        parent = get_parent_or_redirect(request)
        if not parent:
            print("Parent not found")
            return JsonResponse({'success': False, 'error': 'Parent not found'})
        
        print(f"Parent found: {parent}")
        
        # Get the task - ensure it belongs to this parent
        task = get_object_or_404(Entry, 
                                id=task_id, 
                                child__parent=parent,
                                entry_type='task')
        
        print(f"Task found: {task.title} (current status: {task.is_completed})")
        
        # Parse the request data
        import json
        data = json.loads(request.body)
        new_status = data.get('is_completed', False)
        
        print(f"Updating task to completed: {new_status}")
        
        # Update the task
        task.is_completed = new_status
        task.save()
        
        print(f"Task updated successfully. New status: {task.is_completed}")
        
        return JsonResponse({
            'success': True, 
            'is_completed': task.is_completed,
            'task_id': task.id
        })
        
    except Entry.DoesNotExist:
        print(f"Task with id {task_id} not found")
        return JsonResponse({'success': False, 'error': 'Task not found'})
    except json.JSONDecodeError:
        print("Invalid JSON data received")
        return JsonResponse({'success': False, 'error': 'Invalid JSON data'})
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return JsonResponse({'success': False, 'error': str(e)})
