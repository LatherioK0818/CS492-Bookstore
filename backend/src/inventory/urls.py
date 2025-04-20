from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, OrderViewSet, register_user
from . import views

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register'),
    path('me/', views.get_current_user, name='get_current_user'),
]