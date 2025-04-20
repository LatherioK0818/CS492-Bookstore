
from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Book, Order, OrderItem

User = get_user_model()

class BookModelTest(TestCase):
    def setUp(self):
        self.book = Book.objects.create(
            title="Test Book",
            isbn="1234567890123",
            author="Test Author",
            subject="Test Subject",
            price=19.99,
            quantity=10
        )

    def test_book_creation(self):
        self.assertEqual(self.book.title, "Test Book")
        self.assertEqual(str(self.book), "Test Book")

class OrderModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.book = Book.objects.create(
            title="Test Book",
            isbn="1234567890123",
            author="Test Author",
            subject="Test Subject",
            price=19.99,
            quantity=10
        )
        self.order = Order.objects.create(customer=self.user, status="pending")
        self.item = OrderItem.objects.create(order=self.order, book=self.book, quantity=2)

    def test_order_creation(self):
        self.assertEqual(str(self.order), f"Order #{self.order.id} by {self.user.username} - pending")

    def test_order_item_creation(self):
        self.assertEqual(str(self.item), f"2 x {self.book.title} (Order #{self.order.id})")
