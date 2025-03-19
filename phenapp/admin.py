from django.contrib import admin

from .models import Clinic, Pacient, Log

admin.site.register(Clinic)
admin.site.register(Pacient)
admin.site.register(Log)
