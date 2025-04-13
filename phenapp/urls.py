## rutes que necessita el frontend consultar
from django.urls import path, include
from rest_framework import routers
#from phenapp import views
from .views import pacients, login_clinics,clinics,pagina,afegir_pacient

## tot aquest codi em genera les routes GET POST PUT DELETE per clínics
#router = routers.DefaultRouter()
## router genera rutes per un viewSet
#router.register(r'clinics',views.ClinicView,'clinics')
#print(router.urls)

#path('clinics/', views.clinics, name='clinics'),  # Ruta simple per obtenir clínics
#path('api/clinics/', clinics, name='clinics'),  # Ruta DRF

urlpatterns = [
    #path('', views.home, name='home'),
    #path('phenapp/login/', views.auth, name='login'),

    #path('pagina/', views.pagina, name='pagina'),
    #path('api/clinics/register/',views.clinics,name='clinics'),
    #path('api/clinics/login/',views.login_clinics,name='login_clinics'),
    #path('api/pacients/',views.pacients,name='pacients')
    path('pagina/', pagina, name='pagina'),
    path('api/clinics/register/',clinics,name='clinics'),
    path('api/clinics/login/',login_clinics,name='login_clinics'),
    path('api/pacients/',pacients,name='pacients'),
    path('api/afegir_pacient/',afegir_pacient,name='afegir_pacient')
    

    #path('api/', views.api_home, name='api_home'),
    #path("api/processar/", processar_dades, name="processar_dades"),

    # aquesta de sota és la que em permet visualtitzar el docs i els clinics.
    # router.urls està definit a les línies de dalt
    #path("api/",include(router.urls)),
    #path("api/clinics/",include(router.urls)),

    #path('api/clinics',views.ClinicView),
    #path('api/clinics/',views.clinics,name='clinics'),
    
]
