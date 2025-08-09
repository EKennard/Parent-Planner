from django.shortcuts import render, redirect, get_object_or_404
from .forms import registrationForm, childForm, entryForm, noteForm
from .models import Parent, Child, Entry, Category
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages

# Create your views here.

#---------------find parent or redirect-------------------
def get_parent_or_redirect(request):
    try:
        return Parent.objects.get(user=request.user)
    except Parent.DoesNotExist:
        # For onboarding flow, create Parent object automatically
        if request.GET.get('onboarding') == 'true' or request.POST.get('onboarding') == 'true':
            parent = Parent.objects.create(user=request.user)
            return parent
        else:
            messages.error(request, 'Access denied.')
            return None


# ----------------------------home view----------------------------
def home(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    return render(request, 'landing.html')
