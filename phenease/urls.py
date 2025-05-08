from django.urls import path, include
from rest_framework import routers

#from .views import pacients, login_clinics,clinics,pagina,accio_pacient,llistar_termes,afegir_terme
#from .views import eliminar_terme,accio_malaltia,predir_gen,home,gen_counts,trets_count
from .views import home,clinics,login_clinics

urlpatterns = [
    path('', home, name='home'),
    path('api/clinics/register/',clinics,name='clinics'),
    path('api/clinics/login/',login_clinics,name='login_clinics'),
    #path('api/pacients/',pacients,name='pacients'),
    #path('api/accio_pacient/',accio_pacient,name='accio_pacient'),
    #path('api/llistar_termes/',llistar_termes,name='llistar_termes'),
    #path('api/afegir_terme/',afegir_terme,name='afegir_terme'),
    #path('api/eliminar_terme/',eliminar_terme,name='eliminar_terme'),
    #path('api/malalties/',accio_malaltia,name='accio_malaltia'),
    #path('api/predir_gen/', predir_gen, name='predir_gen'),
    #path('api/gens_count/', gen_counts, name='gens_count'),
    #path('api/trets_count/', trets_count, name='trets_count'),
]