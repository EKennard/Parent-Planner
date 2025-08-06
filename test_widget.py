#!/usr/bin/env python
import os
import sys
import django
from django.conf import settings

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'parentplanner.settings')
django.setup()

from planner.forms import ColorGridWidget

# Test the widget
widget = ColorGridWidget()
html_output = widget.render('colour', '#FF6B6B', {'id': 'id_colour'})

print("Widget HTML Output:")
print("=" * 50)
print(html_output)
print("=" * 50)
