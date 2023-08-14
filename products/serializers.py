# products/serializers.py
from rest_framework import serializers
from .models import Product
from .models import Product_details

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        
class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_details
        fields = '__all__'
