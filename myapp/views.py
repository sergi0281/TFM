from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.http import JsonResponse
## a continuació els que afegeixo per la vista post
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

def home(request):
    return HttpResponse("Hola, això és myapp al iniciar django!")

def pagina(request):
    return HttpResponse("Una altra pàgina de django")

def api_home(request):
    data = {"message": "Hola des de Django!"}
    return JsonResponse(data)

@api_view(["POST"])

def processar_dades(request):
    data = request.data  # Rep les dades enviades per React
    nom = data.get("nom", "Desconegut")
    email = data.get("email", "No proporcionat")

    resposta = {
        "missatge": f"Hola {nom}, hem rebut el teu email {email}!",
    }
    return Response(resposta, status=status.HTTP_200_OK)
