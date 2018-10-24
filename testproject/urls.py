from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf.urls import url
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^', include('core.urls')),
]
