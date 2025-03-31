from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from inventory.models import Book, Order, OrderItem
import random

class Command(BaseCommand):
    help = 'Seed database with sample users, books, and orders.'

    def handle(self, *args, **kwargs):
        self.stdout.write("📦 Seeding data...")

        # Create admin user
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(username='admin', password='password', email='admin@example.com')
            self.stdout.write("✅ Created admin user (admin/password)")

        # Create customer user
        if not User.objects.filter(username='customer').exists():
            customer = User.objects.create_user(username='customer', password='password', email='customer@example.com')
            self.stdout.write("✅ Created customer user (customer/password)")
        else:
            customer = User.objects.get(username='customer')

        # Create sample books
        books = [
            {"title": "Django for Pros", "isbn": "1111111111111", "author": "Jane Dev", "subject": "Web Dev", "price": 29.99, "quantity": 10},
            {"title": "APIs in Action", "isbn": "2222222222222", "author": "John Coder", "subject": "REST", "price": 24.99, "quantity": 8},
            {"title": "Python Tricks", "isbn": "3333333333333", "author": "Sarah Snake", "subject": "Python", "price": 19.99, "quantity": 12}
        ]

        for book in books:
            obj, created = Book.objects.get_or_create(isbn=book["isbn"], defaults=book)
            if created:
                self.stdout.write(f"📚 Created book: {obj.title}")

        # Create sample order
        first_book = Book.objects.first()
        if first_book:
            order = Order.objects.create(customer=customer)
            OrderItem.objects.create(order=order, book=first_book, quantity=1)
            self.stdout.write(f"🛒 Created sample order for '{customer.username}'")

        self.stdout.write(self.style.SUCCESS("✅ Seeding complete."))
