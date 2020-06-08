from django.db import models

# Create your models here.
class QRCode(models.Model):
    qr_string = models.CharField(max_length=500)
    qr_size = models.IntegerField()