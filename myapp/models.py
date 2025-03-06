from django.db import models

# Create your models here.

class Message(models.Model):
    text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text

class Usuari(models.Model):
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.nom

class Client(models.Model):
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.nom

class Log(models.Model):
    accio = models.TextField()
    usuari = models.ForeignKey(Usuari, on_delete=models.SET_NULL, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.accio} - {self.usuari}"

