
import logging
import json
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from .peticio_ollama import query_ollama

from .serializer import ClinicSerializer
from .serializer import PacientSerializer
from .serializer import FeatureSerializer
#from .serializer import DiseaseSerializer
from .models import Clinic
from .models import Pacient
from .models import Feature
#from .models import Disease

from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import viewsets
from collections import Counter
from .ontologia import get_obo
#from .ontologia import carregar_ontologia

logger = logging.getLogger(__name__)

def home(request):
    return HttpResponse("<p>Servidor django pel nou backend de phenease</p>")

@api_view(['GET', 'POST'])
#@permission_classes([IsAuthenticated])
@permission_classes([AllowAny])
def clinics(request):
    logger.info(f"Request data: {request.data}")
    if request.method == 'GET':
        clinics = Clinic.objects.all()
        serializer = ClinicSerializer(clinics, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
        serializer = ClinicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            logger.error(f"Invalid data: {serializer.errors}")
            return Response(serializer.errors, status=400)

@api_view(['GET', 'POST'])
#@permission_classes([IsAuthenticated])
@permission_classes([AllowAny])       
def login_clinics(request):
    print(request)
    logger.info(f"Request data: {request.data}")
    data = request.data
    nom = data.get("nom")
    password = data.get("password")
    print(request.data)   #{'nom': 'sergi', 'password': 'sergi'}
    logger.info(f"nom: {nom}, password: {password}")
    try:
        user = Clinic.objects.get(nom=nom)
        
        if check_password(password, user.password):
            return Response({'message': 'Login correcte', 
                             'user': {'id':user.id,'nom': user.nom, 'pass': user.password}},

                             status=200)
        else:
            return Response({'error': 'Contrasenya molt incorrecta amb ',
                             'user': {'id':user.id,'nom': user.nom, 'pass': user.password}, 
                             'vars': password}, 
                             status=400)
    except Clinic.DoesNotExist:
        return Response({'error': 'Usuari no trobat'}, status=404)

@api_view(['GET','POST'])
@permission_classes([AllowAny])
def pacients(request):
    #print("estic a la funció pacients")
    #print("fi request:")
    #print(request)
    #print("final")
    #print(request.data)
    logger.info(f"Request data: {request.data}")
    
    if request.method == 'GET':
        #print("estic al get")
        pacients = Pacient.objects.all()
        serializer = PacientSerializer(pacients, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        print("estic al post d'afegir pacients")
        print(request.data)
        clinic = request.data.get('nom')  # Agafem el nom del clínic
        print("el nom del clínic a afegir pacients es:")
        print(clinic)
        if not clinic:
            return Response({"error": "Falta el nom del clínic"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            clinic_obj = Clinic.objects.get(nom=clinic)
        except Clinic.DoesNotExist:
            return Response({"error": "No s'ha trobat el clínic"}, status=status.HTTP_404_NOT_FOUND)

        pacients = Pacient.objects.filter(clinic=clinic_obj)  
        
        if not pacients.exists():
            return Response({"error": "No s'han trobat pacients per aquest clínic"}, status=status.HTTP_404_NOT_FOUND)

        serializer = PacientSerializer(pacients, many=True)  
        #print(serializer.data) 
        return Response(serializer.data, status=status.HTTP_200_OK)  #     

@api_view(['DELETE','POST'])
@permission_classes([AllowAny])
def accio_pacient(request):
    print("estic a la funció afegir pacients")
    print("la request és:")
    print(request)
    print("final")
    print(request.data)
    
    #if request.method == 'POST':
    #    print("estic al post d'afegir")
    #    clinic = request.data.get('nom')  # Agafem el nom del clínic
    #    print("el nom del clínic es:")
    #    print(clinic)
    #    if not clinic:
    #        return Response({"error": "Falta el nom del clínic"}, status=status.HTTP_400_BAD_REQUEST)

    #     serializer = PacientSerializer(data=request.data)
    #    if serializer.is_valid():
    #        serializer.save()
    #        print(serializer.data)
    #        return Response(serializer.data, status=201)
    #    else:
    #        print("errors en el serializer")
    #        logger.error(f"Invalid data: {serializer.errors}")
    #        return Response(serializer.errors, status=400)
        
    if request.method == 'DELETE':
        print("estic al post d'afegir per eliminar")
        print("imprimeixo la petició que m'ha arribat")
        print(request.data)
        idpacient = request.data.get('id')  # Agafem l'id del pacient
        print("el id del pacient es:")
        print(idpacient)
        try:
            pacient = Pacient.objects.get(id=idpacient)
        except Pacient.DoesNotExist:
            return Response({'error': 'Pacient no trobat'}, status=status.HTTP_404_NOT_FOUND)

        pacient.delete()
        return Response({'message': 'Pacient eliminat correctament'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([AllowAny])
def llistar_termes(request):
    print("estic a la funció termes")
    
    if request.method == 'GET':
        print("estic al get de termes")
        id_pacient = request.GET.get('idpacient')
        try:
            pacient = Pacient.objects.get(id=id_pacient)
        except Pacient.DoesNotExist:
            return Response({'error': 'Pacient no trobat'}, status=404)

        caracteristiques = pacient.caracteristiques.all()  
        serializer = FeatureSerializer(caracteristiques, many=True)
        return Response(serializer.data)
        
@api_view(['POST'])
@permission_classes([AllowAny])
def afegir_terme(request):       
    print("la request és:")
    print(request.data)
    
    codiTerme = request.data.get('codiTerme')
    #print("el codi del terme que volem afegir és:")
    #print(coditerme)
    nomterme = request.data.get('nomTerme')
    #print("el nom del terme que volem afegir és:")
    #print(nomterme)
    id = request.data.get('id')
    idclinic = request.data.get('idclinic')
    clinic = request.data.get('clinic')
    #print("els altres valors són: idpacient, idclinic, nomclinic")
    #print(id)
    #print(idclinic)
    #print(clinic)
    ## [{'id': 1, 'codi': 'HP:1', 'nom': 'prova1'}, {'id': 2, 'codi': 'HP:2', 'nom': 'prova2'}]
    # Filtrar només els camps que t'interessen
    data_filtrada = {
        'codi': request.data.get('codiTerme'),
        'nom': request.data.get('nomTerme')
    }
    print("la dada filtrada és:")
    print(data_filtrada)
        
    if Feature.objects.filter(codi=codiTerme).exists():
        print("Ja existeix")
    else:
        print("No existeix")
        
        serializer = FeatureSerializer(data=data_filtrada)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
        else:
            logger.error(f"Invalid data: {serializer.errors}")
            return Response(serializer.errors, status=400)

    try:
        pacient = Pacient.objects.get(id=id)  
        feature = Feature.objects.get(codi=codiTerme)
        print("el feature és:")
        print(feature)
        print("el pacient és:")
        print(pacient)
        
        print("afegim el feature al pacient")
        pacient.caracteristiques.add(feature)

        serializer = PacientSerializer(pacient) 
        #if serializer.is_valid():
        #    serializer.save()
        print(serializer.data) 
        return Response(serializer.data, status=201)
    except Pacient.DoesNotExist:
        return Response({'error': 'Pacient no trobat'}, status=404)
    except Feature.DoesNotExist:
        return Response({'error': 'Feature no trobat'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
@api_view(['DELETE'])
@permission_classes([AllowAny])
def eliminar_terme(request):
    print("estic al post d'afegir per eliminar")
    print("imprimeixo la petició que m'ha arribat")
    print(request.data)
    idpacient = request.data.get('id')  # Agafem l'id del pacient
    idterme = request.data.get('idterme')
    print("el id del pacient es:")
    print(idpacient)
    print("el id del terme es:")
    print(idterme)
        
    try:
        pacient = Pacient.objects.get(id=idpacient)
    except Pacient.DoesNotExist:
        return Response({'error': 'Pacient no trobat'}, status=status.HTTP_404_NOT_FOUND)

    feature = Feature.objects.get(id=idterme)  # o com el trobis
    print(feature)
        
    print("ara farem la deleció")
    pacient.caracteristiques.remove(feature)
    return Response({'message': 'Pacient eliminat correctament'}, status=status.HTTP_204_NO_CONTENT)

def gens_count(request):
    idclinic=request.GET.get("idclinic")
    ##print("el id del clinic és")
    ##print(idclinic)
    pacients = Pacient.objects.filter(clinic=idclinic)
    gens = [p.gen for p in pacients if p.gen]
    count = Counter(gens)
    #print("vaig a carregar dades")
    data = [{"gen": gen, "count": count[gen]} for gen in count]
    #print(data)
    return JsonResponse(data, safe=False)

def ontologia(request):
    print("entro a carregar la ontologia")
    ontologia = get_obo()

    termes = [
        {
            'id': terme.id,
            'nom': terme.name,
        }
        for terme in ontologia.terms()
    ]
    print("nombre de termes que tinc a la ontologia")
    print(len(termes))

    return JsonResponse(termes, safe=False)

# Create your views here.
@csrf_exempt
def predir_gen(request):
    print("entro a predir gen")
    if request.method == 'POST':
        print(request)
        #print(request.body)
        body = json.loads(request.body)
        #caracteristiques = body.get('caracteristiques', '')

        #prompt = f"Predicció del gen amb HPO {caracteristiques}?"
        #caracteristiques = body.get('caracteristiques', [])
        caracteristiques = body.get('caracteristiques', '')
        print("caracteristiques rebudes:", caracteristiques)
        noms = [element['nom'] for element in caracteristiques]

        print(noms)
        
        # Assegura't que sigui string
        #caracteristiques_str = ', '.join(caracteristiques)

        #prompt = f"Predicció del gen amb els següents trets HPO: {caracteristiques_str}. Quin gen és el més probable?"
        #prompt = f"Dona l'identificador d'un sol gen (només un, per exemple GJB2) donades les següents característiques {caracteristiques} Retorna només una paraula, l'identificador del gen"
        #prompt="list 5 cities from arrounde the world and their countries"
        #prompt=f"list in json format 5 NCBIgen symbol that can be mutated according to these features {noms}"
        prompt=prompt = f"""
                    According to these features: {noms},
                    list only 5 NCBIgen only in json format without more explanations as follows:
                    - "nameGene": name of the gen in ncbi.
                    - "idGene": id of the gene in ncbi.

                    Example:
                    {{
                    "nameGene": "NCBI_GENE_ID1",
                    "idGene": "GEN1"
                    }}.
                    """


        resposta = query_ollama(prompt,"mistral")
        #print(json.loads(resposta)['response'])
        print(resposta)
        #print("la resposta és:")
        return JsonResponse({'resposta': resposta})
    return JsonResponse({'error': 'Només s’accepten peticions POST'}, status=405)
