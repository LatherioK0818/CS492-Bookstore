from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Book, Order
from .serializers import BookSerializer, OrderSerializer


# ✅ Custom permission: only staff can write, everyone can read
class IsStaffOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated and request.user.is_staff


# ✅ ViewSet for managing books
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsStaffOrReadOnly]

    @action(detail=True, methods=['post'], url_path='restock')
    def restock(self, request, pk=None):
        if not request.user.is_staff:
            return Response({'error': 'Only staff can restock books.'}, status=status.HTTP_403_FORBIDDEN)

        book = self.get_object()
        quantity = request.data.get('quantity')

        try:
            quantity = int(quantity)
            if quantity <= 0:
                raise ValueError("Quantity must be positive.")
        except (ValueError, TypeError):
            return Response({'error': 'Invalid quantity'}, status=status.HTTP_400_BAD_REQUEST)

        book.quantity += quantity
        book.save()
        return Response({'message': f"Restocked {quantity} units of '{book.title}'."})


# ✅ ViewSet for managing orders
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['created_at', 'status']
    search_fields = ['status']

    def get_queryset(self):
        user = self.request.user
        queryset = Order.objects.all() if user.is_staff else Order.objects.filter(customer=user)

        # Add optional status filtering
        status_param = self.request.query_params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param)

        return queryset

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)


# ✅ Registration endpoint
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    User = get_user_model()
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already in use."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)