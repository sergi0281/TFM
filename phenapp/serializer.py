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

    #def create(self, validated_data):
        # Xifra la contrasenya abans de guardar-la
    #    user = Clinic(
    #        nom=validated_data['nom'],
    #        email=validated_data['email'],
    #        password=validated_data['password']
    #    )
    #    user.set_password(validated_data['password'])
    #    user.save()
    #    return user
    
    #def validate(self, data):
        # Intentem autenticar l'usuari
    #    user = authenticate(nom=data['nom'], password=data['password'])
    #    if user is None:
    #        raise serializers.ValidationError("Invalid credentials")
    #    return user