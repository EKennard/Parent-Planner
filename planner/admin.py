from django.contrib import admin
from .models import Entry, Category, Parent, Child

# Register your models here.

@admin.register(Entry)
class EntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'child', 'category', 'entry_type', 'created_at', 'updated_at', 'priority', 'due_date', 'is_completed')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent')


@admin.register(Parent)
class ParentAdmin(admin.ModelAdmin):
    list_display = ('user',)

@admin.register(Child)
class ChildAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'birth_date', 'school', 'year', 'class_name', 'colour')
