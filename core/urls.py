from django.conf.urls import url
from django.contrib.auth import views as auth_views
from rest_framework.authtoken import views as rest_views
from core import views
from core.forms import StyledAuthenticationForm
from django.views.generic.base import RedirectView

app_name = 'core'
urlpatterns = [
    url(r'^api/login$', rest_views.obtain_auth_token),
    url(r'^api/user$', views.get_user),
    url(r'^api/signup$', views.signup, name='signup'),
    url(r'$', views.index, name='react_app'),
    url(r'^.*$', RedirectView.as_view(pattern_name='core:react_app', permanent=False)),
]
