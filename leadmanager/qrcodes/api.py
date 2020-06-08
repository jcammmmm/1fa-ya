from qrcodes.models import QRCode
from rest_framework import viewsets, permissions
from .serializers import QRCodeSerializer

class QRCodeViewSet(viewsets.ModelViewSet):
  queryset = QRCode.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]
  serializer_class = QRCodeSerializer



