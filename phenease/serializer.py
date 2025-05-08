from rest_framework import serializers
from .models import Clinic, Pacient, Feature, Disease
from django.contrib.auth import authenticate

#class FeatureSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = Feature
#        fields = ['id','codi','nom']

#class DiseaseSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = Disease
#        fields = ['id','codi', 'nom']

class ClinicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clinic
        #fields = '__all__'  ## 
        fields = ['nom','password', 'email']

#class PacientSerializer(serializers.ModelSerializer):
#        caracteristiques = FeatureSerializer(many=True, read_only=True)
#        malalties = DiseaseSerializer(many=True, read_only=True)

#        class Meta:
#            model = Pacient
            
            #fields = '__all__'  ## 
#            fields = ['id','nom','cognom', 'codi_pacient','dni','sexe','clinic','caracteristiques','malalties','gen','malaltia']
        