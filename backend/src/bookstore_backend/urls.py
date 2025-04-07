from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('inventory.urls')),  # This includes your app's URLs for books and orders
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT Token Obtain
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # JWT Token Refresh
]
