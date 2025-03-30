from django.db import models
#from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


# Create your models here.

class Message(models.Model):
    text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text

class ClinicManager(BaseUserManager):
    def create(self, email, password=None, **extra_fields):
        #"""Crea un usuari normal amb correu electrònic i contrasenya"""
        #if not email:
        #    raise ValueError("Els usuaris han de tenir un correu electrònic")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Xifra la contrasenya
        user.save(using=self._db)  # Guarda l'usuari a la base de dades
        return user

class Clinic(AbstractBaseUser):
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    # altres camps aquí com is_active, is_staff, etc.

    # Necessari per a la gestió de l'usuari
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Configurem el manager personalitzat per a la creació d'usuaris
    objects = ClinicManager()

    #USERNAME_FIELD = 'email'  # Utilitzem el correu com a nom d'usuari
    USERNAME_FIELD = 'nom'  # Utilitzem el correu com a nom d'usuari
    REQUIRED_FIELDS = ['nom']  # Camps que s'han de demanar al crear l'usuari

    def __str__(self):
        return self.nom
    
class Pacient(models.Model):
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.nom

#class Log(models.Model):
#    accio = models.TextField()
#    usuari = models.ForeignKey(Clinics, on_delete=models.SET_NULL, null=True)
#    timestamp = models.DateTimeField(auto_now_add=True)

#    def __str__(self):
#        return f"{self.accio} - {self.usuari}"
