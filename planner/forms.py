from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Parent, Child, Entry
from datetime import date


# generates random colour code from predefined choices
def generate_random_color():
    """Generate a random colour from Child.COLOR_CHOICES."""
    import random
    color_choices = [choice[0] for choice in Child.COLOR_CHOICES]
    return random.choice(color_choices)


class registrationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Remove help text for cleaner UI
        self.fields['password1'].help_text = None
        self.fields['password2'].help_text = None
        self.fields['username'].help_text = None
        
        # Custom error messages
        self.fields['username'].error_messages.update({
            'required': 'Please enter a username.',
            'invalid': 'Please enter a valid username.',
        })
        
        self.fields['password1'].error_messages.update({
            'required': 'Please create a password.',
        })
        
        self.fields['password2'].error_messages.update({
            'required': 'Please confirm your password.',
        })
        
        self.fields['email'].error_messages.update({
            'required': 'Please enter your email address.',
            'invalid': 'Please enter a valid email address.',
        })
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('An account with this email address already exists.')
        return email
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        # If no username provided, generate one from email
        if not username:
            email = self.cleaned_data.get('email')
            if email:
                # Use email prefix as username
                username = email.split('@')[0]
                # Make sure this generated username doesn't conflict
                base_username = username
                counter = 1
                while User.objects.filter(username=username).exists():
                    username = f"{base_username}{counter}"
                    counter += 1
        return username
        
    def save(self, commit=True):
        user = super(registrationForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
            Parent.objects.create(user=user)
        return user


class childForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.instance.pk:
            self.fields['colour'].initial = generate_random_color()
        # Make sure colour field is required so user must select a colour
        self.fields['colour'].required = True
        # Make sure name field is required and has proper validation
        self.fields['name'].required = True
        
        # Set custom label and help text for birth date
        self.fields['birth_date'].label = 'Date of Birth'
        self.fields['birth_date'].help_text = 'Optional - leave blank if you prefer not to specify'
        
        # Add CSS classes to all fields for consistent styling
        for field_name, field in self.fields.items():
            if field_name == 'birth_date':
                # Keep only the child-date-input class for birth date - no conflicting Tailwind classes
                field.widget.attrs.update({
                    'class': 'child-date-input'
                })
            elif field_name == 'colour':
                continue  # Colour field has special styling
            elif isinstance(field.widget, forms.Textarea):
                field.widget.attrs['class'] = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50'
            elif isinstance(field.widget, forms.Select):
                field.widget.attrs['class'] = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50'
            else:
                field.widget.attrs['class'] = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50'
    
    def clean_name(self):
        name = self.cleaned_data.get('name')
        if not name or not name.strip():
            raise forms.ValidationError('Child name is required and cannot be empty.')
        return name.strip()
    
    def clean_birth_date(self):
        birth_date = self.cleaned_data.get('birth_date')
        if birth_date and birth_date > date.today():
            raise forms.ValidationError('Birth date cannot be in the future.')
        return birth_date
    
    def save(self, commit=True):
        instance = super().save(commit=False)
        # Ensure colour has a value
        if not instance.colour:
            instance.colour = generate_random_color()
        if commit:
            instance.save()
        return instance
    
    class Meta:
        model = Child
        fields = ['name', 'birth_date', 'school', 'year', 'class_name', 'colour']
        widgets = {
            'birth_date': forms.DateInput(attrs={
                'type': 'date',
                'class': 'child-date-input'
            }),
            'colour': forms.Select(attrs={'style': 'display: none;'}),
        }
        help_texts = {
            'birth_date': 'Select your child\'s date of birth (optional)',
        }


class entryForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        parent = kwargs.pop('parent', None)
        super().__init__(*args, **kwargs)
        if parent:
            self.fields['child'].queryset = Child.objects.filter(parent=parent)
            if not self.fields['child'].queryset.exists():
                self.fields['child'].help_text = 'You must add at least one child profile before creating entries.'
                self.fields['child'].widget.attrs['disabled'] = True
        
        # Remove 'note' from entry_type choices since notes have their own section
        entry_type_choices = [choice for choice in self.fields['entry_type'].choices if choice[0] != 'note']
        self.fields['entry_type'].choices = entry_type_choices
        
        # Set custom labels for the new event fields
        self.fields['event_date'].label = 'Event Date'
        self.fields['event_start_time'].label = 'Start Time'
        self.fields['event_end_time'].label = 'End Time'
        
        # Set custom labels for the new task fields
        self.fields['task_due_date'].label = 'Due Date'
        self.fields['task_due_time'].label = 'Due Time'
        
        # Add help text
        self.fields['event_date'].help_text = 'Required for events'
        self.fields['event_start_time'].help_text = 'Optional - leave blank for all-day events'
        self.fields['event_end_time'].help_text = 'Optional - leave blank for open-ended events'
        self.fields['task_due_date'].help_text = 'Optional - leave blank if no specific due date'
        self.fields['task_due_time'].help_text = 'Optional - leave blank if no specific due time'
        
        # Add CSS classes to all fields while preserving special date/time classes
        for field_name, field in self.fields.items():
            # Skip fields that have special widget classes defined in Meta
            if field_name in ['event_date', 'event_start_time', 'event_end_time', 'task_due_date', 'task_due_time']:
                # Keep ONLY the existing classes from widgets - no conflicting Tailwind classes
                existing_class = field.widget.attrs.get('class', '')
                field.widget.attrs.update({
                    'class': existing_class.strip()
                })
            elif isinstance(field.widget, forms.Textarea):
                field.widget.attrs['class'] = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50'
            elif isinstance(field.widget, forms.Select):
                field.widget.attrs['class'] = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50'
            else:
                field.widget.attrs['class'] = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50'
    
    def clean_child(self):
        child = self.cleaned_data.get('child')
        if not child:
            raise forms.ValidationError('Please select a child for this entry.')
        return child
    
    def clean(self):
        cleaned_data = super().clean()
        entry_type = cleaned_data.get('entry_type')
        start_time = cleaned_data.get('start_time')
        end_time = cleaned_data.get('end_time')
        event_start_time = cleaned_data.get('event_start_time')
        event_end_time = cleaned_data.get('event_end_time')
        
        # Validate event times (start_time and end_time for existing datetime fields)
        if entry_type == 'event' and start_time and end_time:
            if end_time <= start_time:
                raise forms.ValidationError({
                    'end_time': 'End time must be after start time.',
                    'start_time': 'Start time must be before end time.'
                })
        
        # Validate new separate event times
        if entry_type == 'event' and event_start_time and event_end_time:
            if event_end_time <= event_start_time:
                raise forms.ValidationError({
                    'event_end_time': 'End time must be after start time.',
                    'event_start_time': 'Start time must be before end time.'
                })
        
        return cleaned_data
        
    class Meta:
        model = Entry
        fields = ['title', 'child', 'category', 'entry_type', 'description', 'priority', 'due_date', 'start_time', 'end_time', 'event_date', 'event_start_time', 'event_end_time', 'task_due_date', 'task_due_time', 'location']
        widgets = {
            'due_date': forms.DateTimeInput(attrs={'type': 'text', 'placeholder': 'Select date and time'}),
            'start_time': forms.DateTimeInput(attrs={'type': 'text', 'placeholder': 'Select start time'}),
            'end_time': forms.DateTimeInput(attrs={'type': 'text', 'placeholder': 'Select end time'}),
            'title': forms.TextInput(attrs={'placeholder': 'Enter title...'}),
            'description': forms.Textarea(attrs={'rows': 4, 'placeholder': 'Enter description...'}),
            'location': forms.TextInput(attrs={'placeholder': 'Enter location...'}),
            'event_date': forms.DateInput(attrs={
                'type': 'date', 
                'class': 'event-date-input'
            }),
            'event_start_time': forms.TimeInput(attrs={
                'type': 'time', 
                'class': 'event-time-input'
            }),
            'event_end_time': forms.TimeInput(attrs={
                'type': 'time', 
                'class': 'event-time-input'
            }),
            'task_due_date': forms.DateInput(attrs={
                'type': 'date', 
                'class': 'task-date-input'
            }),
            'task_due_time': forms.TimeInput(attrs={
                'type': 'time', 
                'class': 'task-time-input'
            }),
        }
        help_texts = {
            'event_date': 'Select the date for this event',
            'event_start_time': 'Choose when the event starts (optional)',
            'event_end_time': 'Choose when the event ends (optional)',
            'task_due_date': 'Set a due date for this task (optional)',
            'task_due_time': 'Set a specific due time (optional)',
        }


class noteForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        parent = kwargs.pop('parent', None)
        super().__init__(*args, **kwargs)
        if parent:
            self.fields['child'].queryset = Child.objects.filter(parent=parent)
            if not self.fields['child'].queryset.exists():
                self.fields['child'].help_text = 'You must add at least one child profile before creating notes.'
                self.fields['child'].widget.attrs['disabled'] = True
        
        # Set entry type to note and hide it
        self.initial['entry_type'] = 'note'
        
        # Add CSS classes to all fields
        for field_name, field in self.fields.items():
            if field_name == 'entry_type':
                continue  # Hidden field
            elif isinstance(field.widget, forms.Textarea):
                field.widget.attrs['class'] = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50'
            elif isinstance(field.widget, forms.Select):
                field.widget.attrs['class'] = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50'
            else:
                field.widget.attrs['class'] = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50'
    
    def clean_child(self):
        child = self.cleaned_data.get('child')
        if not child:
            raise forms.ValidationError('Please select a child for this note.')
        return child
        
    class Meta:
        model = Entry
        fields = ['title', 'child', 'category', 'entry_type', 'description']
        widgets = {
            'entry_type': forms.HiddenInput(),
            'description': forms.Textarea(attrs={'rows': 4, 'placeholder': 'Write your note here...'}),
            'title': forms.TextInput(attrs={'placeholder': 'Note title...'}),
        }

