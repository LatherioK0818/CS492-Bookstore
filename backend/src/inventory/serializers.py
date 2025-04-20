from rest_framework import serializers
from .models import Book, Order, OrderItem, OrderStatusLog, CustomUser

# ✅ Book Serializer
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
      
    def create(self, validated_data):
        # Handle single or bulk create
        if isinstance(validated_data, list):
            return Book.objects.bulk_create([Book(**item) for item in validated_data])
        return super().create(validated_data)

# ✅ Order Status Log Serializer
class OrderStatusLogSerializer(serializers.ModelSerializer):
    updated_by = serializers.StringRelatedField()

    class Meta:
        model = OrderStatusLog
        fields = ['status', 'timestamp', 'updated_by']


# ✅ Order Item Serializer
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'book', 'quantity']


# ✅ Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    status_logs = OrderStatusLogSerializer(many=True, read_only=True)
    customer = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'created_at', 'status', 'items', 'status_logs',]

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            book = item_data['book']
            quantity = item_data['quantity']

            if book.quantity < quantity:
                raise serializers.ValidationError(
                    f"Not enough stock for '{book.title}'. Available: {book.quantity}, Requested: {quantity}"
                )

            OrderItem.objects.create(order=order, **item_data)
            book.quantity -= quantity
            book.save()

        return order

    def update(self, instance, validated_data):
        user = self.context['request'].user
        new_status = validated_data.get('status', instance.status)

        # Only allow staff to update status
        if new_status != instance.status:
            if not user.is_staff:
                raise serializers.ValidationError("Only staff can update order status.")

            # Save new status
            instance.status = new_status
            instance.save()

            # ✅ Log the status change
            OrderStatusLog.objects.create(
                order=instance,
                status=new_status,
                updated_by=user
            )
        else:
            instance.save()

        return instance
    
class RegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, required=True)
    email = serializers.EmailField(max_length=254, required=True)
    password = serializers.CharField(min_length=8, write_only=True, required=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'is_staff', 'is_superuser']
        read_only_fields = ['id', 'is_staff', 'is_superuser']