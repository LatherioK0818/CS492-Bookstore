from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, OrderViewSet, register_user  

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'orders', OrderViewSet) 

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register'),
]