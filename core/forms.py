from django import forms
from django.forms.widgets import PasswordInput, TextInput
from django.contrib.auth.forms import (AuthenticationForm, UserCreationForm,
                                       UsernameField, password_validation)


class StyledAuthenticationForm(AuthenticationForm):
    """User authentication form with bootstrap styles"""
    username = UsernameField(
        max_length=254,
        widget=TextInput(attrs={'class': 'form-control'}),
    )
    password = forms.CharField(
        label="Password",
        strip=False,
        widget=PasswordInput(attrs={'class': 'form-control'})
    )


class StyledUserCreationForm(UserCreationForm):
    """User creation form with bootstrap styles"""
    username = forms.CharField(
        widget=TextInput(attrs={'class': 'form-control'}))
    password1 = forms.CharField(
        label="Password",
        strip=False,
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        help_text=password_validation.password_validators_help_text_html(),
    )
    password2 = forms.CharField(
        label="Password confirmation",
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        strip=False,
        help_text="Enter the same password as before, for verification.",
    )
