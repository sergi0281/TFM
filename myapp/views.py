from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.http import JsonResponse

def home(request):
    return HttpResponse("Hola, això és myapp al iniciar django!")

def pagina(request):
    return HttpResponse("Una altra pàgina de django")

def api_home(request):
    data = {"message": "Hola des de Django!"}
    return JsonResponse(data)

