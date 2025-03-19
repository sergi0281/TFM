##from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializer import PhenappSerialitzador
from .models import Clinic

class ClinicView(viewsets.ModelViewSet):
    serializer_class = PhenappSerialitzador
    queryset = Clinic.objects.all()