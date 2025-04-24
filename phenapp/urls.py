from django.urls import path, include
from rest_framework import routers

from .views import pacients, login_clinics,clinics,pagina,accio_pacient,accio_terme,accio_malaltia

urlpatterns = [
    path('pagina/', pagina, name='pagina'),
    path('api/clinics/register/',clinics,name='clinics'),
    path('api/clinics/login/',login_clinics,name='login_clinics'),
    path('api/pacients/',pacients,name='pacients'),
    path('api/accio_pacient/',accio_pacient,name='accio_pacient'),
    path('api/termes/',accio_terme,name='accio_terme'),
    path('api/malalties/',accio_malaltia,name='accio_malaltia'),
]
