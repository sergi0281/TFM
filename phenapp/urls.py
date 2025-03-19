## rutes que necessita el frontend consultar
from django.urls import path, include
from rest_framework import routers
from phenapp import views

## tot aquest codi em genera les routes GET POST PUT DELETE
router = routers.DefaultRouter()
router.register(r'clinics',views.ClinicView,'clinics')

urlpatterns = [
    #path('', views.ClinicView, name='home'),
    #path('pagina/', views.pagina, name='pagina'),
    #path('api/', api_home, name='api_home'),
    #path("api/processar/", processar_dades, name="processar_dades"),
    path("api/clinics/",include(router.urls))

]
