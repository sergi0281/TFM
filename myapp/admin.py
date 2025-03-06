from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Usuari, Client, Log

admin.site.register(Usuari)
admin.site.register(Client)
admin.site.register(Log)

