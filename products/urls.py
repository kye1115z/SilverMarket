# products/urls.py
from django.urls import path
from .views import products_create, products_form, products_detail, user_products_list, user_products_search

urlpatterns = [
    path('create/', products_create, name='products-create'),
    path('form/', products_form, name='products-form'),
    path('<int:pk>/', products_detail, name='products-detail'),
    path('api/products/search/', user_products_search, name='user_products_search'),
    path('user-products/', user_products_list, name='user_products_list'),
    
]

