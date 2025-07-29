from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Parent, Child, Entry, Category
import random

# generates random colour code for the child model
def generate_random_color():
    return "#{:06x}".format(random.randint(0, 0xFFFFFF))

class registrationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')
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
    
    class Meta:
        model = Child
        fields = ['name', 'birth_date', 'school', 'year', 'class_name', 'colour']
        widgets = {
            'birth_date': forms.DateInput(attrs={'type': 'date'}),
            'colour': forms.TextInput(attrs={'type': 'color'}),
        }

class entryForm(forms.ModelForm):
    class Meta:
        model = Entry
        fields = ['title', 'child', 'category', 'entry_type', 'description','priority', 'due_date', 'start_time', 'end_time', 'location']
        widgets = {
            'due_date': forms.DateInput(attrs={'type': 'datetime-local'}),
            'start_time': forms.TimeInput(attrs={'type': 'datetime-local'}),
            'end_time': forms.TimeInput(attrs={'type': 'datetime-local'}),
            'description': forms.Textarea(attrs={'rows': 4}),
        }

