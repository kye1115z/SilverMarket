from django.shortcuts import render
from rest_framework import generics

from.models import Purchaseinfo
from .serializers import PurchaseinfoSerializer

class ListPurchaseinfo(generics.ListCreateAPIView):
    queryset = Purchaseinfo.objects.all()
    serializer_class = PurchaseinfoSerializer

class DetailPurchaseinfo(generics.RetrieveUpdateDestroyAPIView):
    queryset = Purchaseinfo.objects.all()
    serializer_class = PurchaseinfoSerializer