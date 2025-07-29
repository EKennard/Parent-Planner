from django.shortcuts import render, redirect, get_object_or_404
from .forms import registrationForm, childForm, entryForm
from .models import Parent, Child, Entry, Category
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required


# Create your views here.

def home(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    return redirect('login')

def register(request):
    if request.method == 'POST':
        form = registrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('dashboard')
    else:
        form = registrationForm()
    return render(request, 'registration/register.html', {'form': form})