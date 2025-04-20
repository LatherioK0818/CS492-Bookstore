from django.contrib import admin
from .models import Book, Order, OrderItem, OrderStatusLog

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(author=request.user)

    def get_readonly_fields(self, request, obj=None):
        return [] if request.user.is_superuser else ['isbn']

    def get_list_display(self, request):
        return ['title', 'author', 'isbn', 'subject', 'quantity', 'price'] if request.user.is_superuser else ['title', 'author', 'subject', 'quantity', 'price']

    def get_search_fields(self, request):
        return ['title', 'author', 'isbn', 'subject'] if request.user.is_superuser else ['title', 'author', 'subject']

    def get_list_filter(self, request):
        return ['author', 'subject'] if request.user.is_superuser else ['subject']

    def get_ordering(self, request):
        return ['title'] if request.user.is_superuser else ['-quantity']

    def get_list_per_page(self, request):
        return 10 if request.user.is_superuser else 5

    def get_fieldsets(self, request, obj=None):
        return (
            (None, {
                'fields': ('title', 'author', 'isbn', 'subject', 'quantity', 'price')
            }),
        )

    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_view_permission(self, request, obj=None):
        return request.user.is_superuser
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(OrderStatusLog)