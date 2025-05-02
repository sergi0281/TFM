import json
import os

import django
os.chdir('/Users/sergi/Documents/UOC/TFM/hpotfmback')
# Carrega la configuració del projecte Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hpotfmback.settings")
django.setup()
from phenapp.models import Pacient, Feature
#/Users/sergi/Documents/UOC/TFM/dades mock/SOD1

mock_jsons = "/Users/sergi/Documents/UOC/TFM/dades mock/SOD1"
for nom_fitxer in os.listdir(mock_jsons):
    fitxer = os.path.join(mock_jsons, nom_fitxer)
        

    with open(fitxer, "r") as file:
        
        pacient_data = json.load(file)
        print(file)

    for item in pacient_data:
        #codi_pacient = item.get("id", "Desconegut")
        #item_dict = json.loads(item)
        print(item)
        codi_pacient = item.get("id","Desconegut")  ## a item no hi ha tot el fitxer
        if(item.get(["subject"],{}).get("sex")=="FEMALE"):
            #sexe = item.get(["subject"]["sex"], "O")[0] 
            sexe = item.get("subject", {}).get("sex", "0")[0]
        clinic=1
        ##sexe = item.get(["subject"],{}).get["sex"], "O")[0]  # "FEMALE" → "F"

        pacient, exists = Pacient.objects.get_or_create(
            codi_pacient=codi_pacient,
            defaults={
                "sexe": sexe,
                "clinic": 1 
            }
        )

        # Afegeix característiques fenotípiques (features)
        for feature in item.get("phenotypicFeatures", []):
            tipus = feature.get("type", {})
            codi = tipus.get("id")
            nom = tipus.get("label")

            if codi and nom:
                carac, _ = Feature.objects.get_or_create(
                    codi=codi,
                    defaults={"nom": nom}  
                )
                pacient.caracteristiques.add(carac)

        pacient.save()
