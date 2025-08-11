
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    
    # RESTORED ORIGINAL VIEWS
    path('dashboard/', views.dashboard, name='dashboard'),
    path('child/<int:child_id>/', views.child_entries, name='child_entries'),
    
    # Other views (unchanged)
    path('add-child/', views.add_child, name='add_child'),
    path('add-entry/', views.add_entry, name='add_entry'),
    
    # Decision dialogue for onboarding
    path('onboarding-decision/<int:child_id>/', views.onboarding_decision, name='onboarding_decision'),
    
    path('edit-child/<int:child_id>/', views.edit_child, name='edit_child'),
    path('delete-child/<int:child_id>/', views.delete_child, name='delete_child'),
    path('edit-entry/<int:entry_id>/', views.edit_entry, name='edit_entry'),
    path('delete-entry/<int:entry_id>/', views.delete_entry, name='delete_entry'),
    path('toggle-completion/<int:entry_id>/', views.toggle_entry_completion, name='toggle_entry_completion'),
    path('tasks/<int:task_id>/toggle-completion/', views.toggle_task_completion, name='toggle_task_completion'),
    path('quick-delete/<int:entry_id>/', views.quick_delete_entry, name='quick_delete_entry'),
    # path('register/', views.registration, name='register'),
    # path('logout/', views.logout_view, name='logout'),
]