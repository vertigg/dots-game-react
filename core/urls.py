from django.conf.urls import url
from django.contrib.auth import views as auth_views
from core import views
from core.forms import StyledAuthenticationForm

app_name = 'core'
api_patterns = []

urlpatterns = [
    url('^login/$', auth_views.LoginView.as_view(authentication_form=StyledAuthenticationForm), name='login'),
    url('^logout/$', auth_views.LogoutView.as_view(next_page='core:react_app'), name='logout'),
    url('^signup/$', views.signup, name='signup'),
    url('^$', views.index, name='react_app'),
]
