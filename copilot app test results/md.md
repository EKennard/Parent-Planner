# Django Best Practices Guide - Parent-Planner Application

## Table of Contents
1. [Project Structure](#project-structure)
2. [Security Practices](#security-practices)
3. [Models & Database](#models--database)
4. [Views & Templates](#views--templates)
5. [Forms & Validation](#forms--validation)
6. [Performance Optimization](#performance-optimization)
7. [Testing & Debugging](#testing--debugging)
8. [Deployment & Production](#deployment--production)

---

## 🏗️ Project Structure

### Current Structure Analysis
```
Parent-Planner/
├── manage.py
├── parentplanner/          # Main project settings
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── planner/               # Main application
│   ├── models.py
│   ├── views.py
│   ├── forms.py
│   ├── urls.py
│   └── admin.py
├── templates/             # Template files
│   ├── base.html
│   ├── dashboard.html
│   ├── registration/
│   └── planner/
└── static/               # Static files
    └── css/
```

### ✅ Best Practices
- **Logical app separation**: Keep related functionality in single apps
- **Consistent naming**: Use lowercase with underscores
- **Template organization**: Group by app or functionality
- **Static file structure**: Organize by type (css, js, images)

### ❌ Common Mistakes
- Putting all models in one huge file
- Mixing business logic in templates
- Not using proper Django app structure

---

## 🔐 Security Practices

### Authentication & Authorization
```python
# ✅ Good: Check user ownership
@login_required
def edit_child(request, child_id):
    child = get_object_or_404(Child, id=child_id, parent=request.user)
    # ... rest of view

# ❌ Bad: No ownership check
def edit_child(request, child_id):
    child = Child.objects.get(id=child_id)  # Any user can edit any child!
```

### CSRF Protection
```html
<!-- ✅ Always include in forms -->
<form method="post">
    {% csrf_token %}
    <!-- form fields -->
</form>
```

### Settings Security
```python
# settings.py
DEBUG = False  # Never True in production
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']
SECRET_KEY = os.environ.get('SECRET_KEY')  # Use environment variables

# Security middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

---

## 📊 Models & Database

### Model Design Best Practices
```python
class Child(models.Model):
    # ✅ Good field ordering: Required fields first
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(User, on_delete=models.CASCADE)
    
    # Optional fields after required ones
    school = models.CharField(max_length=200, blank=True)
    year = models.CharField(max_length=20, blank=True)
    colour = models.CharField(max_length=7, default='#000000', blank=True)
    
    # Timestamps last
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
        verbose_name_plural = "Children"
    
    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('child_detail', kwargs={'pk': self.pk})
```

### Query Optimization
```python
# ❌ Bad: N+1 queries
children = Child.objects.all()
for child in children:
    print(child.entry_set.count())  # Separate query for each child

# ✅ Good: Use prefetch_related
children = Child.objects.prefetch_related('entry_set').all()
for child in children:
    print(child.entry_set.count())  # No additional queries

# ✅ Good: Use select_related for ForeignKey
entries = Entry.objects.select_related('child', 'category').all()
```

### Migration Best Practices
```bash
# Always create migrations for model changes
python manage.py makemigrations

# Review migration files before applying
python manage.py showmigrations

# Apply migrations
python manage.py migrate

# For data migrations, create custom migration files
python manage.py makemigrations --empty planner
```

---

## 🎨 Views & Templates

### View Organization
```python
# ✅ Good: Function-based view with proper error handling
@login_required
def add_child(request):
    """Add a new child to the current user's family."""
    if request.method == 'POST':
        form = ChildForm(request.POST)
        if form.is_valid():
            child = form.save(commit=False)
            child.parent = request.user
            child.save()
            messages.success(request, f'{child.name} has been added successfully!')
            return redirect('dashboard')
    else:
        form = ChildForm()
    
    return render(request, 'planner/addChild.html', {'form': form})

# ✅ Good: Class-based view alternative
class ChildCreateView(LoginRequiredMixin, CreateView):
    model = Child
    form_class = ChildForm
    template_name = 'planner/addChild.html'
    success_url = reverse_lazy('dashboard')
    
    def form_valid(self, form):
        form.instance.parent = self.request.user
        messages.success(self.request, f'{form.instance.name} has been added!')
        return super().form_valid(form)
```

### Template Inheritance
```html
<!-- base.html: Master template -->
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}ParentPlanner{% endblock %}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <nav><!-- Navigation --></nav>
    
    <main>
        {% block content %}{% endblock %}
    </main>
    
    <footer><!-- Footer --></footer>
</body>
</html>

<!-- child_template.html: Extend base -->
{% extends 'base.html' %}

{% block title %}Add Child - ParentPlanner{% endblock %}

{% block content %}
    <!-- Page specific content -->
{% endblock %}
```

### Context Processors
```python
# context_processors.py
def user_children(request):
    """Add user's children to all template contexts."""
    if request.user.is_authenticated:
        return {
            'user_children': request.user.child_set.all()
        }
    return {}

# settings.py
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'myapp.context_processors.user_children',  # Custom processor
            ],
        },
    },
]
```

---

## 📝 Forms & Validation

### Form Design
```python
class ChildForm(forms.ModelForm):
    class Meta:
        model = Child
        fields = ['name', 'school', 'year', 'class_name', 'colour']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 rounded-md',
                'placeholder': 'Enter child\'s name'
            }),
            'colour': forms.TextInput(attrs={
                'type': 'color',
                'class': 'w-full h-10 border border-gray-300 rounded-md'
            })
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].required = True
        if not self.instance.pk:
            self.fields['colour'].initial = generate_random_color()
    
    def clean_name(self):
        """Custom validation for name field."""
        name = self.cleaned_data.get('name')
        if len(name) < 2:
            raise forms.ValidationError("Name must be at least 2 characters long.")
        return name.title()  # Capitalize properly
```

### Error Handling in Templates
```html
<!-- ✅ Good: Comprehensive error display -->
<form method="post">
    {% csrf_token %}
    
    {% if form.non_field_errors %}
        <div class="bg-red-50 text-red-700 p-4 rounded-md mb-4">
            {{ form.non_field_errors }}
        </div>
    {% endif %}
    
    <div class="mb-4">
        <label for="{{ form.name.id_for_label }}" class="block text-sm font-medium">
            {{ form.name.label }}
        </label>
        {{ form.name }}
        {% if form.name.errors %}
            <div class="text-red-600 text-sm mt-1">
                {{ form.name.errors }}
            </div>
        {% endif %}
    </div>
</form>
```

---

## ⚡ Performance Optimization

### Database Queries
```python
# ✅ Efficient: Get dashboard data in minimal queries
def dashboard(request):
    # Use annotations to count related objects
    children = request.user.child_set.annotate(
        entry_count=Count('entry')
    ).prefetch_related('entry_set')
    
    # Aggregate data efficiently
    stats = request.user.child_set.aggregate(
        total_children=Count('id'),
        total_entries=Count('entry'),
        completed_tasks=Count('entry', filter=Q(entry__is_completed=True))
    )
    
    context = {
        'children': children,
        'stats': stats,
    }
    return render(request, 'dashboard.html', context)
```

### Template Optimization
```html
<!-- ✅ Good: Minimize template logic -->
{% for child in children %}
    <div class="child-card">
        <h3>{{ child.name }}</h3>
        <p>{{ child.entry_count }} entries</p>  <!-- From annotation -->
    </div>
{% empty %}
    <p>No children added yet.</p>
{% endfor %}

<!-- ❌ Bad: Complex logic in template -->
{% for child in children %}
    {% for entry in child.entry_set.all %}  <!-- N+1 queries! -->
        <!-- Complex calculations in template -->
    {% endfor %}
{% endfor %}
```

### Caching
```python
# settings.py
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}

# views.py
from django.core.cache import cache

def dashboard(request):
    cache_key = f'dashboard_data_{request.user.id}'
    data = cache.get(cache_key)
    
    if data is None:
        # Generate data
        data = generate_dashboard_data(request.user)
        cache.set(cache_key, data, 300)  # Cache for 5 minutes
    
    return render(request, 'dashboard.html', data)
```

---

## 🧪 Testing & Debugging

### Unit Testing
```python
# tests.py
from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Child

class ChildModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        
    def test_child_creation(self):
        """Test that a child can be created properly."""
        child = Child.objects.create(
            name='Test Child',
            parent=self.user,
            school='Test School'
        )
        self.assertEqual(child.name, 'Test Child')
        self.assertEqual(child.parent, self.user)
        self.assertTrue(child.colour)  # Should have default color

class ChildViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        
    def test_add_child_requires_login(self):
        """Test that adding a child requires authentication."""
        response = self.client.get('/add-child/')
        self.assertRedirects(response, '/accounts/login/?next=/add-child/')
        
    def test_add_child_success(self):
        """Test successful child creation."""
        self.client.login(username='testuser', password='testpass123')
        response = self.client.post('/add-child/', {
            'name': 'New Child',
            'school': 'Test School',
            'year': 'Year 1'
        })
        self.assertRedirects(response, '/dashboard/')
        self.assertTrue(Child.objects.filter(name='New Child').exists())
```

### Debugging Tools
```python
# settings.py (development)
if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
    
    # Django Debug Toolbar settings
    INTERNAL_IPS = ['127.0.0.1']

# Use logging for debugging
import logging
logger = logging.getLogger(__name__)

def add_child(request):
    logger.debug(f'User {request.user} accessing add_child view')
    # ... view logic
```

---

## 🚀 Deployment & Production

### Environment Configuration
```python
# settings/base.py
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

# settings/development.py
from .base import *

DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# settings/production.py
from .base import *

DEBUG = False
ALLOWED_HOSTS = [os.environ.get('ALLOWED_HOST')]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT'),
    }
}

# Static files for production
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'
```

### Static Files
```python
# settings.py
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

# For production
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'
```

### Security Headers
```python
# settings/production.py
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

---

## 📖 Code Quality & Style

### PEP 8 Compliance
```python
# ✅ Good: Proper naming and spacing
class ChildEntry(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    def get_absolute_url(self):
        return reverse('entry_detail', kwargs={'pk': self.pk})

# ❌ Bad: Poor naming and spacing
class childentry(models.Model):
    Title=models.CharField(max_length=200)
    Description=models.TextField(blank=True)
    
    def getAbsoluteUrl(self):
        return reverse('entry_detail',kwargs={'pk':self.pk})
```

### Documentation
```python
class Child(models.Model):
    """
    Represents a child in the family planning system.
    
    Each child belongs to a parent (User) and can have multiple
    entries (tasks, notes, events) associated with them.
    
    Attributes:
        name (str): The child's full name
        parent (User): The Django user who owns this child record
        school (str): Optional school name
        year (str): Optional school year/grade
        colour (str): Hex color code for visual identification
    """
    name = models.CharField(max_length=100, help_text="Child's full name")
    parent = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        help_text="Parent who owns this child record"
    )
    # ... other fields
```

### Code Review Checklist
- [ ] All functions have docstrings
- [ ] No hardcoded values (use settings)
- [ ] Proper error handling
- [ ] Security checks (user authorization)
- [ ] Tests written for new functionality
- [ ] Database queries optimized
- [ ] Templates extend base.html properly
- [ ] Forms include CSRF tokens
- [ ] Static files properly organized

---

## 🎯 Implementation Checklist for Parent-Planner

### Immediate Improvements
- [ ] Add user authorization checks to all views
- [ ] Standardize error message display across templates
- [ ] Optimize database queries with select_related/prefetch_related
- [ ] Add comprehensive form validation
- [ ] Implement proper logging

### Medium-term Goals
- [ ] Add unit tests for all models and views
- [ ] Implement caching for dashboard data
- [ ] Add API endpoints for mobile app integration
- [ ] Improve accessibility (ARIA labels, keyboard navigation)
- [ ] Add data export functionality

### Long-term Vision
- [ ] Real-time updates with WebSockets
- [ ] Advanced reporting and analytics
- [ ] Integration with school systems
- [ ] Mobile app development
- [ ] Multi-language support

---

This guide provides a comprehensive framework for maintaining and improving your Parent-Planner Django application while following industry best practices.