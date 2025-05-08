from django.contrib import admin

from .models import Clinic, Pacient, Feature, Disease

class PacientAdmin(admin.ModelAdmin):
    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "caracteristiques":
            kwargs["queryset"] = Feature.objects.order_by("codi") 
        return super().formfield_for_manytomany(db_field, request, **kwargs)

admin.site.register(Clinic)
#admin.site.register(Pacient)
admin.site.register(Feature)
admin.site.register(Disease)
admin.site.register(Pacient,PacientAdmin)

#admin.site.register(Log)

