from rest_framework import serializers
from qrcodes.models import QRCode

class QRCodeSerializer(serializers.ModelSerializer):
  class Meta:
    model = QRCode
    fields = '__all__'