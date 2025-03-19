from django.db import models

# Create your models here.

class Message(models.Model):
    text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text

class Clinic(models.Model):
    nom = models.CharField(max_length=100)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.nom

class Pacient(models.Model):
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.nom

class Log(models.Model):
    accio = models.TextField()
    usuari = models.ForeignKey(Clinic, on_delete=models.SET_NULL, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.accio} - {self.usuari}"
