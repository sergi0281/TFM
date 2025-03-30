import logging
##from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
# Create your views here.

from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import viewsets

from .serializer import ClinicSerializer
from .models import Clinic

logger = logging.getLogger(__name__)

def home(request):
    return HttpResponse("Hola, això és phenapp al iniciar django!")

def pagina(request):
    return HttpResponse("Una altra pàgina de django")

def api_home(request):
    data = {"message": "Hola des de Django amb api!"}
    return JsonResponse(data)

class ClinicView(viewsets.ModelViewSet):
    serializer_class = ClinicSerializer
    queryset = Clinic.objects.all()

@api_view(['GET', 'POST'])
#@permission_classes([IsAuthenticated])
@permission_classes([AllowAny])
def clinics(request):
    logger.info(f"Request data: {request.data}")
    if request.method == 'GET':
        clinics = Clinic.objects.all()
        serializer = ClinicSerializer(clinics, many=True)
        return JsonResponse(serializer.data, safe=False)
        
    elif request.method == 'POST':
        serializer = ClinicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        else:
            logger.error(f"Invalid data: {serializer.errors}")
            return JsonResponse(serializer.errors, status=400)

@api_view(['GET', 'POST'])
#@permission_classes([IsAuthenticated])
@permission_classes([AllowAny])       
def login_clinics(request):
    logger.info(f"Request data: {request.data}")
    data = request.data
    nom = data.get("nom")
    password = data.get("password")
    print(request.data)
    print(nom)
    print(password)
    logger.info(f"Request data: {request.data}")
    #permission_classes = [AllowAny] 

    #user = authenticate(request, username=nom, password=password)
    try:
        #user = Clinic.objects.get(email=email)
        user = Clinic.objects.get(nom=nom)
        
        # Verifiquem si la contrasenya és correcta
        if check_password(password, user.password):
            #return JsonResponse({'message': 'Login correcte', 'user': {'nom': user.nom, 'email': user.email}}, status=200)
            return JsonResponse({'message': 'Login correcte', 'user': {'nom': user.nom, 'pass': user.password}}, status=200)
        else:
            return JsonResponse({'error': 'Contrasenya molt incorrecta amb ','user': {'nom': user.nom, 'pass': user.password}, 'vars': password}, status=400)
    except Clinic.DoesNotExist:
        return JsonResponse({'error': 'Usuari no trobat'}, status=404)
    
    #if user is not None:
    #    refresh = RefreshToken.for_user(user)
    #    access_token = refresh.access_token

        # Retornar el token i un missatge d'èxit
        #return Response({

    #    return Response({'refresh': str(refresh), 'access': str(refresh.access_token)}, status=status.HTTP_200_OK)
    #else:
    #    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
                
    #resposta = {
    #    "missatge": f"Hola {nom}, aquest és el teu {password}",
    #}
    #return Response(resposta, status=status.HTTP_200_OK)

#@api_view(['GET'])
#def get_clinics(request):
#    nom = request.GET.get('nom', None)  # Captura el paràmetre de la URL
#    if nom:
#        clinics = Clinic.objects.filter(nom__icontains=nom)  # Cerca parcial
#    else:
#        clinics = Clinic.objects.all()  # Retorna totes si no es passa un nom

#    serializer = ClinicSerializer(clinics, many=True)
#    return Response(serializer.data)

# mirar autenticació amb JWT tokens (jason web token)
#@api_view(['POST'])
#def auth(request):
#    nom = request.data.get('nom')
#    password = request.data.get('pass')

#        user = authenticate(username=nom, password=password)
#    if user is not None:
#        return Response({'message': 'Login correcte', 'user_id': user.id}, status=status.HTTP_200_OK)
#    else:
#        return Response({'error': 'Credencials incorrectes'}, status=status.HTTP_401_UNAUTHORIZED)
