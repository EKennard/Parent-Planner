
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('add-child/', views.add_child, name='add_child'),
    path('add-entry/', views.add_entry, name='add_entry'),
    path('child/<int:child_id>/', views.child_entries, name='child_entries'),
    path('edit-child/<int:child_id>/', views.edit_child, name='edit_child'),
    path('edit-entry/<int:entry_id>/', views.edit_entry, name='edit_entry'),
    path('delete-entry/<int:entry_id>/', views.delete_entry, name='delete_entry'),
    path('toggle-completion/<int:entry_id>/', views.toggle_entry_completion, name='toggle_entry_completion'),
    path('quick-delete/<int:entry_id>/', views.quick_delete_entry, name='quick_delete_entry'),
    path('register/', views.registration, name='register'),
]