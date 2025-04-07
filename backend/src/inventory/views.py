from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from .models import Book, Order
from .serializers import BookSerializer, OrderSerializer
from rest_framework.pagination import PageNumberPagination


# Custom permission: Only staff can write, everyone can read
class IsStaffOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated and request.user.is_staff


# Pagination for Book and Order ViewSets
class BookPagination(PageNumberPagination):
    page_size = 10

class OrderPagination(PageNumberPagination):
    page_size = 10


# ViewSet for managing books
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsStaffOrReadOnly]
    pagination_class = BookPagination

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


# ViewSet for managing orders
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Order.objects.all() if user.is_staff else Order.objects.filter(customer=user)
        return queryset

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

    @action(detail=True, methods=["post"], url_path="checkout")
    def checkout(self, request, pk=None):
        order = self.get_object()
        order_items = order.items.all()  # Assuming `items` is a related field for order items

        for item in order_items:
            book = item.book  # Assuming each order item has a `book` field
            ordered_quantity = item.quantity  # Assuming each order item tracks `quantity`

            if book.quantity >= ordered_quantity:
                book.quantity -= ordered_quantity
                book.save()
            else:
                return Response(
                    {"error": f"Not enough stock for '{book.title}'."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        order.status = "completed"  # Update order status to completed
        order.save()

        return Response({"message": "Order placed successfully!"}, status=status.HTTP_201_CREATED)


# Function to get the current logged-in user
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):
    return Response({
        'username': request.user.username,
        'email': request.user.email,
        'is_staff': request.user.is_staff,
        'first_name': request.user.first_name,
        'last_name': request.user.last_name
    })
