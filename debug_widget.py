#!/usr/bin/env python
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'parentplanner.settings')
django.setup()

# Now test the widget
from planner.forms import childForm, ColorGridWidget
from planner.models import Child

print("=== Testing Color Choices ===")
print("Child.COLOR_CHOICES:", Child.COLOR_CHOICES)

print("\n=== Testing Widget ===")
widget = ColorGridWidget()
html = widget.render('colour', '#FF6B6B', {'id': 'test_colour'})
print("Widget HTML:")
print(html)

print("\n=== Testing Form ===")
form = childForm()
print("Form colour field widget:", form.fields['colour'].widget)
print("Form colour field choices:", getattr(form.fields['colour'], 'choices', 'No choices'))
