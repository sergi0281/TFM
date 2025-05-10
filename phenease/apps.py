from django.apps import AppConfig

class PheneaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'phenease'

    def ready(self):
        # Aquesta línia forçarà l'execució del teu ontology.py
        from . import ontologia  # Aquesta importació executa carregar_ontologia()
