# products/serializers.py
from rest_framework import serializers
from .models import Product
from .models import Product_details

#기본 products JSON 직렬화
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

#디테일 페이지 JSON 직렬화
class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_details
        fields = '__all__'
