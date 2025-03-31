from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
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
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)

        return queryset

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)
