from django.shortcuts import render, redirect, get_object_or_404
from .forms import registrationForm, childForm, entryForm
from .models import Parent, Child, Entry, Category
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db import models

# Create your views here.

#---------------find parent or redirect-------------------
def get_parent_or_redirect(request):
    try:
        return Parent.objects.get(user=request.user)
    except Parent.DoesNotExist:
        messages.error(request, 'Access denied.')
        return None


# ----------------------------home view----------------------------
def home(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    return redirect('login')

def registration(request):
    if request.method == 'POST':
        form = registrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('dashboard')
    else:
        form = registrationForm()
    return render(request, 'registration.html', {'form': form})


#-----------------------------dashboard view---------------------------------
@login_required
def dashboard(request):
    parent, _ = Parent.objects.get_or_create(user=request.user)
    children = Child.objects.filter(parent=parent)
    recent_entries = Entry.objects.filter(child__parent=parent)[:10]
    
    context = {
        'parent': parent,
        'children': children,
        'recent_entries': recent_entries,
    }
    return render(request, 'dashboard.html', context)


#-----------add child view----------------------------
@login_required
def add_child(request):
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
    if request.method == 'POST':
        form = childForm(request.POST)
        if form.is_valid():
            child = form.save(commit=False)
            child.parent = parent 
            child.save()
            messages.success(request, f'Added {child.first_name}!')
            return redirect('dashboard')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = childForm()
    return render(request, 'planner/add_child.html', {'form': form})


#-----------------------add entry view----------------------------
@login_required
def add_entry(request):
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
    if request.method == 'POST':
        form = entryForm(request.POST, parent=parent)
        if form.is_valid():
            entry = form.save()
            entry_type = entry.get_entry_type_display().lower()
            messages.success(request, f'Added {entry_type} for {entry.child.first_name}!')
            return redirect('child_entries', child_id=entry.child.id)
    else:
        form = entryForm(parent=parent)
    return render(request, 'planner/add_entry.html', {'form': form})


#-----------------------child entries view----------------------------
@login_required
def child_entries(request, child_id):
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
    child = get_object_or_404(Child, id=child_id, parent=parent)
    if request.method == 'POST':
        form = entryForm(request.POST, parent=parent)
        if form.is_valid():
            entry = form.save()
            messages.success(request, f'Added {entry.get_entry_type_display().lower()} for {child.first_name}!')
            return redirect('child_entries', child_id=child.id)
    else:
        form = entryForm(parent=parent, initial={'child': child})
    entries = Entry.objects.filter(child=child).defer('is_completed').order_by('-created_at')
    entry_type_filter = request.GET.get('type')
    if entry_type_filter in ['note', 'task', 'event']:
        entries = entries.filter(entry_type=entry_type_filter)
    return render(request, 'planner/child_entries.html', {
        'child': child,
        'form': form,
        'entries': entries,
        'entry_type_filter': entry_type_filter,
        'categories': Category.objects.all(),
    })



#---------------------------------edit entry view----------------------------
@login_required
def edit_entry(request, entry_id):
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
    entry = get_object_or_404(Entry.objects.defer('is_completed'), id=entry_id, child__parent=parent)
    if request.method == 'POST':
        form = entryForm(request.POST, instance=entry, parent=parent)
        if form.is_valid():
            form.save()
            messages.success(request, f'Updated {entry.get_entry_type_display().lower()}: {entry.title}')
            return redirect('child_entries', child_id=entry.child.id)
    else:
        form = entryForm(instance=entry, parent=parent)
    return render(request, 'planner/edit_entry.html', {
        'form': form,
        'entry': entry,
        'child': entry.child,
    })


#-----------------------delete entry view----------------------------
@login_required
def delete_entry(request, entry_id):
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
            messages.success(request, f'Updated {child.first_name}!')
            return redirect('dashboard')
    else:
        form = childForm(instance=child)
    return render(request, 'planner/edit_child.html', {
        'form': form,
        'child': child,
    })


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
    parent = get_parent_or_redirect(request)
    if not parent:
        return redirect('register')
    entry = get_object_or_404(Entry.objects.defer('is_completed'), id=entry_id, child__parent=parent)
    if request.method == 'POST':
        entry_title = entry.title
        entry_type = entry.get_entry_type_display()
        entry.delete()
        messages.success(request, f'Deleted {entry_type.lower()}: {entry_title}')
    return redirect('dashboard')
