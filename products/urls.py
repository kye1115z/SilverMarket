# products/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/products/', views.product_list, name='product-list'),
    path('api/products/writer/<str:writer_id>/', views.products_by_writer, name='products-by-writer'),
    path('api/products/category/<str:category_id>/', views.products_by_category, name='products-by-category'),
    path('products/simple/', views.simple_product_list, name='simple-product-list'),
    path('api/products/<int:pk>/', views.ProductDetailAPIView.as_view(), name='product-detail'),
]


