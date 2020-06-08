from rest_framework import routers
from .api import QRCodeViewSet

router = routers.DefaultRouter()
router.register('api/qrcodes', QRCodeViewSet, 'qrcodes')

urlpatterns = router.urls