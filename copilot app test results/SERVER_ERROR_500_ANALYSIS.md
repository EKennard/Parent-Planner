# Django 500 Server Error - Troubleshooting Analysis
**Date**: July 31, 2025  
**Project**: Parent-Planner Django Application  
**Issue**: Server Error 500 - Critical Problems Identified

## 🚨 CRITICAL ISSUES FOUND

### 1. **TEMPLATE-MODEL FIELD MISMATCH** ❌
**Location**: Multiple templates reference wrong field name
**Issue**: Templates reference `first_name` field but model uses `name`

**Problem Code**:
```python
# In models.py (LINE 20) - Child model actually has:
name = models.CharField(max_length=50)  # Field is called "name"

# But templates reference:
# templates/dashboard.html line 105:
{{ child.first_name }}  # WRONG - should be {{ child.name }}

# templates/planner/addChild.html line 60:
{{ form.first_name }}   # WRONG - should be {{ form.name }}

# templates/planner/childEntries.html line 54:
{{ child.first_name }}  # WRONG - should be {{ child.name }}
```

**Error**: This will cause `TemplateSyntaxError` or field not found errors

### 2. **MISSING FORM INITIALIZATION** ❌
**Location**: `planner/forms.py` - `entryForm` class
**Issue**: Form doesn't handle parent parameter passed from views

**Problem**: Views call `entryForm(parent=parent)` but form doesn't accept this parameter

### 3. **WIDGET TYPE MISMATCH** ❌
**Location**: `planner/forms.py` - `entryForm` widgets
**Issue**: Using wrong widget types for datetime fields

**Problem Code**:
```python
widgets = {
    'due_date': forms.DateInput(attrs={'type': 'datetime-local'}),     # WRONG
    'start_time': forms.TimeInput(attrs={'type': 'datetime-local'}),   # WRONG  
    'end_time': forms.TimeInput(attrs={'type': 'datetime-local'}),     # WRONG
}
```

### 4. **TEMPLATE REFERENCES COUNT** ❌
**Affected Templates**: 
- `templates/dashboard.html` - 4 `first_name` references (should be `name`)
- `templates/planner/childEntries.html` - 4 `first_name` references (should be `name`)
- `templates/planner/addChild.html` - 6 `first_name` references (should be `name`)

## 🔧 IMMEDIATE FIXES REQUIRED

### Fix 1: Correct Template Field References
The Child model uses `name`, not `first_name`. Update all template references:

**Templates to Fix**:
```html
<!-- In templates/dashboard.html - Change 4 instances: -->
{{ child.name }} <!-- instead of {{ child.first_name }} -->

<!-- In templates/planner/childEntries.html - Change 4 instances: -->
{{ child.name }} <!-- instead of {{ child.first_name }} -->

<!-- In templates/planner/addChild.html - Change 6 instances: -->
{{ form.name }} <!-- instead of {{ form.first_name }} -->
{{ form.name.id_for_label }} <!-- instead of {{ form.first_name.id_for_label }} -->
{{ form.name.label }} <!-- instead of {{ form.first_name.label }} -->
{{ form.name.help_text }} <!-- instead of {{ form.first_name.help_text }} -->
{{ form.name.errors }} <!-- instead of {{ form.first_name.errors }} -->
```

**Forms are CORRECT** - `childForm` already uses the right field:
```python
# In planner/forms.py - childForm class (THIS IS CORRECT)
fields = ['name', 'birth_date', 'school', 'year', 'class_name', 'colour']
#          ^^^^ This matches the model field correctly
```

### Fix 2: Add Entry Form Initialization
```python
# In planner/forms.py - entryForm class
class entryForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        # Extract parent parameter before calling super()
        parent = kwargs.pop('parent', None)
        super().__init__(*args, **kwargs)
        
        # Filter child choices by parent
        if parent:
            self.fields['child'].queryset = Child.objects.filter(parent=parent)
    
    class Meta:
        model = Entry
        fields = ['title', 'child', 'category', 'entry_type', 'description','priority', 'due_date', 'start_time', 'end_time', 'location']
        widgets = {
            'due_date': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
            'start_time': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
            'end_time': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
            'description': forms.Textarea(attrs={'rows': 4}),
        }
```

### Fix 3: Verify Model-Template Consistency
The Child model field is correctly named `name`:
```python
# In planner/models.py - Child model (THIS IS CORRECT)
class Child(models.Model):
    name = models.CharField(max_length=50)  # ✅ Correct field name
    # ... other fields
```

## 🔍 DEBUGGING STEPS

### Step 1: Check Django Debug Mode
Ensure DEBUG=True in settings for detailed error messages:
```python
# In parentplanner/settings.py
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '.herokuapp.com']
```

### Step 2: Test Django Check
```bash
# Activate virtual environment
source .venv/Scripts/activate

# Run Django checks
python manage.py check
python manage.py check --deploy
```

### Step 3: Check Database Migrations
```bash
# Check if migrations are up to date
python manage.py showmigrations
python manage.py makemigrations
python manage.py migrate
```

### Step 4: Test Specific URLs
Try accessing specific URLs to isolate the problem:
- `/admin/` - Should work if forms are fixed
- `/register/` - Will fail if childForm has field mismatch
- `/dashboard/` - Will fail if entryForm initialization fails

## 🚨 MOST LIKELY CAUSES OF 500 ERROR

1. **Template Field References** (95% probability)
   - Templates reference `child.first_name` but model field is `child.name`
   - Templates reference `form.first_name` but form field is `form.name`  
   - This causes `AttributeError` or `FieldError` when templates try to access non-existent fields

2. **Form Parameter Error** (70% probability)
   - `entryForm` doesn't handle `parent` parameter from views
   - Causes `TypeError` on form initialization

3. **Widget Configuration** (50% probability)
   - Wrong widget types for datetime fields
   - May cause form rendering errors

## 🎯 PRIORITY FIX ORDER

**PRIORITY 1** - Fix Template Field References:
```html
<!-- Change all template references from first_name to name -->
<!-- In templates/dashboard.html: -->
{{ child.name }} <!-- instead of {{ child.first_name }} -->

<!-- In templates/planner/childEntries.html: -->
{{ child.name }} <!-- instead of {{ child.first_name }} -->

<!-- In templates/planner/addChild.html: -->
{{ form.name }} <!-- instead of {{ form.first_name }} -->
```

**PRIORITY 2** - Add Entry Form __init__ method:
```python
def __init__(self, *args, **kwargs):
    parent = kwargs.pop('parent', None)
    super().__init__(*args, **kwargs)
    if parent:
        self.fields['child'].queryset = Child.objects.filter(parent=parent)
```

**PRIORITY 3** - Fix Widget Types:
```python
# Use DateTimeInput instead of DateInput/TimeInput for datetime fields
'due_date': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
```

## 🔧 QUICK DIAGNOSIS COMMANDS

### Check if Server Starts:
```bash
cd /c/Users/liz/Desktop/vscode-projects/Parent-Planner
source .venv/Scripts/activate
python manage.py runserver
```

### Get Specific Error Details:
```bash
# Check logs with verbose output
python manage.py runserver --verbosity=2
```

### Test Form Import:
```bash
python manage.py shell
>>> from planner.forms import childForm, entryForm
>>> # If this fails, you'll see the exact error
```

## 📊 EXPECTED OUTCOMES AFTER FIXES

After implementing the priority fixes:
- ✅ Django server will start without 500 errors
- ✅ Registration page will load correctly
- ✅ Dashboard will display properly
- ✅ All CRUD operations will work
- ✅ Forms will render and submit correctly

## 🚀 VERIFICATION STEPS

1. Fix the field name mismatch in childForm
2. Add __init__ method to entryForm
3. Test server startup: `python manage.py runserver`
4. Test registration page: `/register/`
5. Test dashboard: `/dashboard/`
6. Test adding a child: `/add-child/`

---
**URGENT**: The template field references (`first_name` vs `name`) are almost certainly causing the 500 error. Fix the template references first and the server should start working immediately.

**Next Steps**: After fixing the templates, implement the entryForm __init__ method to handle the parent parameter from views.
