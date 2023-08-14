# products/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/products/', views.product_list, name='product-list'),
    #path('api/products_by_writer/', views.products_by_writer, name='products-by-writer'),
    path('api/products/writer/<str:writer_id>/', views.products_by_writer, name='products-by-writer'),
]


