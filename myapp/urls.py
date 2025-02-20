from django.urls import path
from . import views
from .views import api_home

urlpatterns = [
    path('', views.home, name='home'),
    path('api/', api_home, name='api_home'),
]

