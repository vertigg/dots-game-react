from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from core.forms import StyledUserCreationForm
from django.contrib.auth import authenticate, login


@login_required(login_url='/login/')
def index(request):
    """Main React app"""
    return render(request, 'index.html')


def signup(request):
    if request.method == 'POST':
        form = StyledUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('core:react_app')
    else:
        form = StyledUserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})
