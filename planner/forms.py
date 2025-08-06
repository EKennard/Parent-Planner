from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Parent, Child, Entry
import random
from datetime import date

# generates random colour code from predefined choices
def generate_random_color():
    from .models import Child
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
        # Customize password help text
        # self.fields['password1'].help_text = 'Your password must contain at least 8 characters and cannot be entirely numeric.'
        # self.fields['password2'].help_text = 'Enter the same password as before, for verification.'
        self.fields['password1'].help_text = None
        self.fields['password2'].help_text = None
        # Optional: Customize other field help text
        # self.fields['username'].help_text = 'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'
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
        # Make sure colour field isn't required since it has a default
        self.fields['colour'].required = False
        
        # Add custom styling for the color field
        self.fields['colour'].widget.attrs.update({
            'class': 'color-select w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
        })
    
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
            'birth_date': forms.DateInput(attrs={'type': 'date'}),
            'colour': forms.Select(),
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
    
    def clean_child(self):
        child = self.cleaned_data.get('child')
        if not child:
            raise forms.ValidationError('Please select a child for this entry.')
        return child
    class Meta:
        model = Entry
        fields = ['title', 'child', 'category', 'entry_type', 'description','priority', 'due_date', 'start_time', 'end_time', 'location']
        widgets = {
            'due_date': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
            'start_time': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
            'end_time': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
            'description': forms.Textarea(attrs={'rows': 4}),
        }

