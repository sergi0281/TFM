from rest_framework import serializers
from .models import Clinic, Pacient
from django.contrib.auth import authenticate

#class PhenappSerialitzador(serializers.ModelSerializer): ## TaskSerializer
#     class Meta:
#         model = Clinic
#         fields = '__all__'

class ClinicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clinic
        #fields = '__all__'  ## 
        fields = ['nom','password', 'email']

class PacientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pacient
        #fields = '__all__'  ## 
        fields = ['id','nom','cognom', 'codi_pacient','dni','sexe','clinic']
        