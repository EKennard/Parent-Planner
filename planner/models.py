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
    parent = models.ForeignKey('Parent', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    birth_date = models.DateField(blank=True, null=True)
    school = models.CharField(max_length=100, blank=True)
    year = models.CharField(max_length=20, blank=True)
    class_name = models.CharField(max_length=50, blank=True)
    colour = models.CharField(max_length=7, default='#000000', blank=True)  # hex color code
    
    def __str__(self):
        return self.name



# --------------------------- entry model ----------------------------

class Entry(models.Model):

    # entry types for the planner
    entryTypes = [
        ('Note', 'Note'),
        ('Task', 'Task'),
        ('Event', 'Event'),
    ]
    
    #priority types 
    priority = [
        ('Low', 'Low'),       
        ('Medium', 'Medium'), 
        ('High', 'High'),     
    ]

    category = [
        ('None', 'None'),
        ('Homework', 'Homework'),
        ('Health', 'Health'),
        ('School', 'School'),
        ('Activities', 'Activities'),
        ('Chores', 'Chores'),
        ('Appointments', 'Appointments'),
        ('Reminders', 'Reminders'),
        ('Celebrations', 'Celebrations'),
        ('Achievements', 'Achievements'),
        ('Other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    child = models.ForeignKey(Child, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    entry_type = models.CharField(max_length=10, choices=entryTypes, default='note')
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    priority = models.CharField(max_length=10, choices=priority, default='medium', blank=True)
    due_date = models.DateTimeField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
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
