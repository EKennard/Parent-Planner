from django.db import models
from django.contrib.auth.models import User


# --------------------------- category model ----------------------------
class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name


# --------------------------- child model ----------------------------

class Child(models.Model):
    
    # Predefined colour choices for children
    COLOR_CHOICES = [
        ('#FF6B6B', 'Coral Red'),
        ('#4ECDC4', 'Turquoise'),
        ('#0D6A80', 'Sky Blue'),
        ('#96CEB4', 'Mint Green'),
        ('#D1D811', 'Sunny Yellow'),
        ('#DDA0DD', 'Plum Purple'),
        ('#AD6A0D', 'Peach Orange'),
        ('#8516EE', 'Light Blue'),
        ('#0CEB0C', 'Pale Green'),
        ('#BE12E0', 'Bright Pink'),
    ]
    
    parent = models.ForeignKey('Parent', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    birth_date = models.DateField(blank=True, null=True)
    school = models.CharField(max_length=100, blank=True)
    year = models.CharField(max_length=20, blank=True)
    class_name = models.CharField(max_length=50, blank=True)
    colour = models.CharField(max_length=7, choices=COLOR_CHOICES, default='#FF6B6B', blank=True)  # hex colour code
    
    def __str__(self):
        return self.name


# --------------------------- entry model ----------------------------

class Entry(models.Model):

    # entry types for the planner
    ENTRY_TYPES = [
        ('note', 'Note'),
        ('task', 'Task'),
        ('event', 'Event'),
    ]
    
    # priority types 
    PRIORITY_CHOICES = [
        ('low', 'Low'),       
        ('medium', 'Medium'), 
        ('high', 'High'),     
    ]

    CATEGORY_CHOICES = [
        ('none', 'None'),
        ('homework', 'Homework'),
        ('health', 'Health'),
        ('school', 'School'),
        ('activities', 'Activities'),
        ('chores', 'Chores'),
        ('appointments', 'Appointments'),
        ('reminders', 'Reminders'),
        ('celebrations', 'Celebrations'),
        ('achievements', 'Achievements'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    child = models.ForeignKey(Child, on_delete=models.CASCADE)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='none', blank=True)
    entry_type = models.CharField(max_length=10, choices=ENTRY_TYPES, default='note')
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium', blank=True)
    due_date = models.DateTimeField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
    # Separate date and time fields for events
    event_date = models.DateField(blank=True, null=True)
    event_start_time = models.TimeField(blank=True, null=True)
    event_end_time = models.TimeField(blank=True, null=True)
    # Separate date and time fields for tasks
    task_due_date = models.DateField(blank=True, null=True)
    task_due_time = models.TimeField(blank=True, null=True)
    location = models.CharField(max_length=200, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_entry_type_display()}: {self.title}"


# --------------------------- parent model ----------------------------

class Parent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Parent: {self.user.username}"   
