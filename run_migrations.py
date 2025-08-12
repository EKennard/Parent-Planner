#!/usr/bin/env python
import os
import sys
import django

# Add the parent directory to the path so we can import Django
sys.path.insert(0, 'C:/Users/Lizzk/Desktop/vscode-projects/Parent-Planner')

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'parentplanner.settings')
django.setup()

# Now run the migration
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    print("Running Django migrations...")
    try:
        execute_from_command_line(['manage.py', 'migrate'])
        print("Migrations completed successfully!")
    except Exception as e:
        print(f"Error running migrations: {e}")
        sys.exit(1)
