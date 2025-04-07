from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, OrderViewSet, current_user  # ✅ Import the new view

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/me/', current_user),  # ✅ Add this route for role-based frontend
]
# ✅ This will allow the frontend to fetch the current user's information and role.
# ✅ The `current_user` view should return the user's information, including their role.
# ✅ This is useful for role-based frontend logic, such as showing/hiding certain UI elements based on the user's role.