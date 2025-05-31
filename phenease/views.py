
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
from .models import Clinic
from .models import Pacient
from .models import Feature

from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import viewsets
from collections import Counter
from .ontologia import get_obo

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
    logger.info(f"Request data: {request.data}")
    data = request.data
    nom = data.get("nom")
    password = data.get("password")
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

@api_view(['POST'])
@permission_classes([AllowAny])
def afegir_pacient(request):
    logger.info(f"Request data: {request.data}")
    
    if request.method == 'POST':
        codi = request.data.get('codi')
        gen = request.data.get('gen')
        malaltia = request.data.get('malaltia')
        idclinic = request.data.get('idclinic')
        print(idclinic)
        sexe = request.data.get('sexe')

        pacient = {
            'codi_pacient': codi,
            'gen': gen,
            'malaltia': malaltia,
            'sexe': sexe,
            'clinic': idclinic,

        }
        if Pacient.objects.filter(codi_pacient=codi).exists():
            print("Ja existeix")
        else:
            print("No existeix")
    
            serializer = PacientSerializer(data=pacient)
            if serializer.is_valid():
                serializer.save()
                print(serializer.data)
                return Response(serializer.data, status=status.HTTP_200_OK)      
            else:
                logger.error(f"Invalid data: {serializer.errors}")
                return Response(serializer.errors, status=400)

@api_view(['GET','POST'])
@permission_classes([AllowAny])
def pacients(request):
    logger.info(f"Request data: {request.data}")
    
    if request.method == 'GET':
        pacients = Pacient.objects.all()
        serializer = PacientSerializer(pacients, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        clinic = request.data.get('nom') 
        if not clinic:
            return Response({"error": "Falta el nom del clínic"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            clinic_obj = Clinic.objects.get(nom=clinic)
        except Clinic.DoesNotExist:
            return Response({"error": "No s'ha trobat el clínic"}, status=status.HTTP_404_NOT_FOUND)

        pacients = Pacient.objects.filter(clinic=clinic_obj)  
        
        if not pacients.exists():
            return Response({"error": "No s'han trobat pacients per aquest clínic"}, 
                            status=status.HTTP_404_NOT_FOUND)

        serializer = PacientSerializer(pacients, many=True)  
        return Response(serializer.data, status=status.HTTP_200_OK)      

@api_view(['DELETE','POST'])
@permission_classes([AllowAny])
def accio_pacient(request):    
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
    if request.method == 'GET':
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
    codiTerme = request.data.get('codiTerme')
    id = request.data.get('id')
    data_filtrada = {
        'codi': request.data.get('codiTerme'),
        'nom': request.data.get('nomTerme')
    }
    # a a data_filtrada obtenim tenim la informació requerida pel terme, el seu codi i el nom
    # això es fa perquè en la request, que és la informació que ens arriba per la petició
    # també hi tenim altres dades com són el id del clinic o el id del pacient.
    # Mirem també si la caracterísica ja ha estat donada d'alta per assignació a un altre
    # pacient.
    if Feature.objects.filter(codi=codiTerme).exists():
        print("Ja existeix")
    else:
        print("No existeix")
        
        serializer = FeatureSerializer(data=data_filtrada)
        if serializer.is_valid():
            # el save és la introducció del nou tret fenotípic a la base de dades
            serializer.save()
        else:
            logger.error(f"Invalid data: {serializer.errors}")
            return Response(serializer.errors, status=400)
    # a continuació afegirem aquella característica concreta al pacient mitjançant
    # la comanda add i retornem el pacient serialitzat (en format json)
    try:
        pacient = Pacient.objects.get(id=id)  
        feature = Feature.objects.get(codi=codiTerme)
        pacient.caracteristiques.add(feature)

        serializer = PacientSerializer(pacient) 
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
    idpacient = request.data.get('id')  # Agafem l'id del pacient
    idterme = request.data.get('idterme')
        
    try:
        pacient = Pacient.objects.get(id=idpacient)
    except Pacient.DoesNotExist:
        return Response({'error': 'Pacient no trobat'}, status=status.HTTP_404_NOT_FOUND)

    feature = Feature.objects.get(id=idterme)  # o com el trobis
    
    pacient.caracteristiques.remove(feature)
    return Response({'message': 'Pacient eliminat correctament'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def gens_count(request):
    idclinic=request.GET.get("idclinic")
    pacients = Pacient.objects.filter(clinic=idclinic)
    gens = [p.gen for p in pacients if p.gen]
    count = Counter(gens)
    data = [{"gen": gen, "count": count[gen]} for gen in count]
    return JsonResponse(data, safe=False)

def ontologia(request):
    ontologia = get_obo()

    termes = [
        {
            'id': terme.id,
            'nom': terme.name,
        }
        for terme in ontologia.terms()
    ]
    
    return JsonResponse(termes, safe=False)

@api_view(['POST'])
@csrf_exempt
def predir_gen(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        caracteristiques = body.get('caracteristiques', '')
        noms = [element['nom'] for element in caracteristiques]

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
        resposta = query_ollama(prompt,"llama3.2")
        return JsonResponse({'resposta': resposta})
    return JsonResponse({'error': 'Només s’accepten peticions POST'}, status=405)
