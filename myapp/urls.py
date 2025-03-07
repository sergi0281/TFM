from django.urls import path
from . import views
from .views import api_home
from .views import processar_dades

urlpatterns = [
    path('', views.home, name='home'),
    path('pagina/', views.pagina, name='pagina'),
    path('api/', api_home, name='api_home'),
    path("api/processar/", processar_dades, name="processar_dades"),
]

