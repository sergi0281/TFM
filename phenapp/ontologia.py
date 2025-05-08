from pronto import Ontology

print("Carregant fitxer OBO...")
ontologia = Ontology("/Users/sergi/Documents/UOC/TFM/hp.obo")
#ontology = Ontology("/Users/sergi/Documents/UOC/TFM/hp.obo")
print("Fitxer OBO carregat.")

def get_obo():
    return ontologia