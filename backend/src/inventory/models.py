from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

class Book(models.Model):
    title = models.CharField(max_length=200)
    isbn = models.CharField(max_length=13, unique=True)
    author = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    quantity = models.PositiveIntegerField()
    cover_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]

    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(default=timezone.now)
    timestamp = models.DateTimeField(default=timezone.now) 


    def __str__(self):
        return f"Order #{self.id} by {self.customer.username} - {self.status}"

    def __str__(self):
        return f"Order #{self.id} by {self.customer.username} - {self.status}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.book.title} (Order #{self.order.id})"

class OrderStatusLog(models.Model):
    order = models.ForeignKey(Order, related_name='status_logs', on_delete=models.CASCADE)
    status = models.CharField(max_length=20)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    timestamp = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Order #{self.order.id} changed to {self.status} by {self.updated_by.username if self.updated_by else 'Unknown'}"

class Payment(models.Model):
    order = models.OneToOneField("Order", on_delete=models.CASCADE)
    cardholder_name = models.CharField(max_length=100)
    masked_card = models.CharField(max_length=20)
    status = models.CharField(max_length=20, default="paid")
    timestamp = models.DateTimeField(auto_now_add=True)