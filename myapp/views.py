from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.http import JsonResponse

def home(request):
    return HttpResponse("Hola, això és myapp!")

def api_home(request):
    data = {"message": "Hola des de Django!"}
    return JsonResponse(data)

