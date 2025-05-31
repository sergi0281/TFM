from django.urls import path, include
from rest_framework import routers

#from .views import pacients, login_clinics,clinics,pagina,accio_pacient,llistar_termes,afegir_terme
#from .views import eliminar_terme,accio_malaltia,predir_gen,home,gen_counts,trets_count
from .views import home,clinics,login_clinics,accio_pacient,pacients,llistar_termes,afegir_terme
from .views import eliminar_terme,gens_count,ontologia,predir_gen,afegir_pacient

urlpatterns = [
    path('', home, name='home'),
    path('api/clinics/register/',clinics,name='clinics'),
    path('api/clinics/login/',login_clinics,name='login_clinics'),
    path('api/pacients/',pacients,name='pacients'),
    path('api/accio_pacient/',accio_pacient,name='accio_pacient'),
    path('api/afegir_pacient/',afegir_pacient,name='afegir_pacient'),
    path('api/llistar_termes/',llistar_termes,name='llistar_termes'),
    path('api/afegir_terme/',afegir_terme,name='afegir_terme'),
    path('api/eliminar_terme/',eliminar_terme,name='eliminar_terme'),
    path('api/ontologia/', ontologia, name='ontologia'),
    path('api/predir_gen/', predir_gen, name='predir_gen'),
    path('api/gens_count/', gens_count, name='gens_count'),
]