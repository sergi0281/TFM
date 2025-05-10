from pronto import Ontology

def carregar_ontologia():
    print("Carregant fitxer OBO...")
    ontologia = Ontology("/Users/sergi/Documents/UOC/TFM/hp.obo")
    print("Fitxer OBO carregat.")
    return ontologia

ontologia=carregar_ontologia()

def get_obo():
    return ontologia