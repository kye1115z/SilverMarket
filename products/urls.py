# products/urls.py
from django.urls import path
from .views import products_create, products_form, products_detail

urlpatterns = [
    path('create/', products_create, name='products-create'),
    path('form/', products_form, name='products-form'),
    path('<int:pk>/', products_detail, name='products-detail'),
]
