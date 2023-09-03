from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListPurchaseinfo.as_view()),
    path('<int:pk>/', views.DetailPurchaseinfo.as_view()),
]