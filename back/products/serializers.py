# products/serializers.py
from rest_framework import serializers
from .models import Product


#기본 products JSON 직렬화
class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = '__all__'


#상품 사진, 상품명, 가격만을 반환하는 api JSON 직렬화
class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('photo', 'products_name', 'price')

#상품의 모든 정보를 반환하는 api JSON 직렬화
class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

