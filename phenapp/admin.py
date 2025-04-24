from django.contrib import admin

from .models import Clinic, Pacient, Feature, Disease

admin.site.register(Clinic)
admin.site.register(Pacient)
admin.site.register(Feature)
admin.site.register(Disease)

#admin.site.register(Log)
