from rest_framework import serializers
from .models import Clinic, Pacient, Log

class PhenappSerialitzador(serializers.ModelSerializer): ## TaskSerializer
    class Meta:
        model = Clinic
        fields = '__all__'