from django.conf.urls import url
from django.contrib.auth import views as auth_views
from rest_framework.authtoken import views as rest_views
from core import views
from core.forms import StyledAuthenticationForm

app_name = 'core'
api_patterns = [
    url(r'^api/login$', rest_views.obtain_auth_token),
    url(r'^api/user$', views.get_user),
    url(r'^api/signup$', views.signup, name='signup'),
]

urlpatterns = [
    url('^$', views.index, name='react_app'),
]

urlpatterns += api_patterns
