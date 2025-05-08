from django.db import models

# Create your models here.

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
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Xifra la contrasenya
        user.save(using=self._db)  # Guarda l'usuari a la base de dades
        return user

class Clinic(AbstractBaseUser):
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = ClinicManager()

    USERNAME_FIELD = 'nom'  # Utilitzem el correu com a nom d'usuari
    REQUIRED_FIELDS = ['nom']  # Camps que s'han de demanar al crear l'usuari

    def __str__(self):
        return self.nom
    
class Feature(models.Model):
    codi = models.CharField(max_length=255,unique=True)
    nom = models.CharField(max_length=255)

    def __str__(self):
        return self.codi

class Disease(models.Model):
    codi = models.CharField(max_length=255)
    nom = models.CharField(max_length=255)

    def __str__(self):
        return self.nom
    
class Pacient(models.Model):
    SEXE_CHOICES = [
        ('M', 'Masculí'),
        ('F', 'Femení'),
        ('O', 'Altres')
    ]
    codi_pacient = models.CharField(max_length=255, unique=True)
    sexe = models.CharField(max_length=1, choices=SEXE_CHOICES)
    clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE)
    caracteristiques = models.ManyToManyField(Feature, blank=True)
    malaltia = models.CharField(max_length=255, unique=False, blank=True)
    gen = models.CharField(max_length=255, unique=False, blank=True)

    def __str__(self):
        return f"{self.codi_pacient}"

        #fields = '__all__'

#class Log(models.Model):
#    accio = models.TextField()
#    usuari = models.ForeignKey(Clinics, on_delete=models.SET_NULL, null=True)
#    timestamp = models.DateTimeField(auto_now_add=True)

#    def __str__(self):
#        return f"{self.accio} - {self.usuari}"
