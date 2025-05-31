import logging
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from .peticio_ollama import query_ollama
from .models import Pacient

import json

from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import viewsets
from collections import Counter
from .serializer import ClinicSerializer
from .serializer import PacientSerializer
from .serializer import FeatureSerializer
from .serializer import DiseaseSerializer
from .models import Clinic
from .models import Pacient
from .models import Feature
from .models import Disease
from .ontologia import get_obo

logger = logging.getLogger(__name__)

def home(request):
    return HttpResponse("<p>Servidor django pel backend de phenease</p>")

def pagina(request):
    return Response("Una altra pàgina de django")

def api_home(request):
    data = {"message": "Hola des de Django amb api!"}
    return Response(data)

class ClinicView(viewsets.ModelViewSet):
    serializer_class = ClinicSerializer
    queryset = Clinic.objects.all()

def suggerir_termes(request):
    terme_buscat = request.GET.get('terme', '')
    ontology = get_obo()
    
    resultats = [
        {'id': terme.id, 'name': terme.name}
        for terme in ontology.terms()
        if terme.name.lower().startswith(terme_buscat.lower())
    ]
    return JsonResponse(resultats, safe=False)

@csrf_exempt
def predir_gen(request):
    print("entro a predir gen")
    if request.method == 'POST':
        body = json.loads(request.body)
        caracteristiques = body.get('caracteristiques', '')
        print("caracteristiques rebudes:", caracteristiques)
        
        prompt="list 5 cities from arrounde the world and their countries"
        
        resposta = query_ollama(prompt,"mistral")

        print("la resposta és:")
        return JsonResponse({'resposta': resposta})
    return JsonResponse({'error': 'Només s’accepten peticions POST'}, status=405)

def gen_counts(request):
    idclinic=request.GET.get("idclinic")
    pacients = Pacient.objects.filter(clinic=idclinic)
    gens = [p.gen for p in pacients if p.gen]
    count = Counter(gens)
    data = [{"gen": gen, "count": count[gen]} for gen in count]
    return JsonResponse(data, safe=False)

def trets_count(request):
    idclinic = request.GET.get("idclinic")
    pacients = Pacient.objects.filter(clinic=idclinic)
    features = []
    for pacient in pacients:
        features += list(pacient.caracteristiques.all().values_list('nom', flat=True))
    count = Counter(features)
    data = [{"feature": feature, "count": count[feature]} for feature in count]
    return JsonResponse(data, safe=False)

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
    coditerme = request.data.get('codiTerme')
    nomterme = request.data.get('nomTerme')
    id = request.data.get('id')
    idclinic = request.data.get('idclinic')
    clinic = request.data.get('clinic')
    data_filtrada = {
        'codi': request.data.get('codiTerme'),
        'nom': request.data.get('nomTerme')
    }
        
    if Feature.objects.filter(codi=coditerme).exists():
        print("Ja existeix")
    else:
        print("No existeix")
        
        serializer = FeatureSerializer(data=data_filtrada)
        if serializer.is_valid():
            serializer.save()
        else:
            logger.error(f"Invalid data: {serializer.errors}")
            return Response(serializer.errors, status=400)

    pacient = Pacient.objects.get(id=id)  
    feature = Feature.objects.get(codi=coditerme) 
        
    pacient.caracteristiques.add(feature)

    serializer = PacientSerializer(pacient)  
    return Response(serializer.data, status=201)

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

   
@api_view(['GET','POST'])
@permission_classes([AllowAny])
def accio_malaltia(request):
    logger.info(f"Request data: {request.data}")
    
    if request.method == 'GET':
        malalties = Disease.objects.all()
        serializer = DiseaseSerializer(malalties, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        terme = request.data.get('codiMalaltia')
        terme2 = request.data.get('nomMalaltia')
        pacientid = request.data.get('pacient')
        data_filtrada = {
            'codi': request.data.get('codiMalaltia'),
            'nom': request.data.get('nomMalaltia')
        }
        
        if Feature.objects.filter(codi=terme).exists():
            print("Ja existeix")
        else:
            print("No existeix")
        
            serializer = DiseaseSerializer(data=data_filtrada)
            if serializer.is_valid():
                serializer.save()
            else:
                logger.error(f"Invalid data: {serializer.errors}")
                return Response(serializer.errors, status=400)

        clinic =  request.data.get('clinic')
        pacient = Pacient.objects.get(id=pacientid)  # o com el busquis
        disease = Disease.objects.get(codi=terme)  # o com el trobis
        
        pacient.malalties.add(disease)
        return Response(serializer.data, status=201)


@api_view(['GET','POST'])
@permission_classes([AllowAny])
def pacients(request):
    logger.info(f"Request data: {request.data}")
    
    if request.method == 'GET':
        pacients = Pacient.objects.all()
        serializer = PacientSerializer(pacients, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        clinic = request.data.get('nom')  # Agafem el nom del clínic
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
        return Response(serializer.data, status=status.HTTP_200_OK)  #     


@api_view(['DELETE','POST'])
@permission_classes([AllowAny])
def accio_pacient(request):
    if request.method == 'POST':
        clinic = request.data.get('clinic')  # Agafem el nom del clínic
        if not clinic:
            return Response({"error": "Falta el nom del clínic"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PacientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            logger.error(f"Invalid data: {serializer.errors}")
            return Response(serializer.errors, status=400)
        
    elif request.method == 'DELETE':
        idpacient = request.data.get('id')  # Agafem l'id del pacient
        try:
            pacient = Pacient.objects.get(id=idpacient)
        except Pacient.DoesNotExist:
            return Response({'error': 'Pacient no trobat'}, status=status.HTTP_404_NOT_FOUND)

        pacient.delete()
        return Response({'message': 'Pacient eliminat correctament'}, status=status.HTTP_204_NO_CONTENT)


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

# mirar autenticació amb JWT tokens (json web token)
#@api_view(['POST'])
#def auth(request):
#    nom = request.data.get('nom')
#    password = request.data.get('pass')
#        user = authenticate(username=nom, password=password)
#    if user is not None:
#        return Response({'message': 'Login correcte', 'user_id': user.id}, status=status.HTTP_200_OK)
#    else:
#        return Response({'error': 'Credencials incorrectes'}, status=status.HTTP_401_UNAUTHORIZED)
