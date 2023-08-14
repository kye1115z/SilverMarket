from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Product_details
from .serializers import ProductSerializer
from django.db.models import Q
from .models import Product_details
from .serializers import ProductDetailSerializer

#상품 등록(POST), 등록돈 상품 전체 조회(GET) api
@api_view(['GET', 'POST'])
def product_list(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#특정 유저가 등록한 상품들만 불러오기 GET api
@api_view(['GET'])
def products_by_writer(request, writer_id):
    products = Product.objects.filter(writer_id=writer_id)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

#특정 카테고리별 상품들만 불러오기 GET api
@api_view(['GET'])
def products_by_category(request, category_id):
    products = Product.objects.filter(category=category_id)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

#상품 디테일 페이지 GET api
@api_view(['GET'])
def product_detail_list(request):
    product_details = Product_details.objects.all()
    serializer = ProductDetailSerializer(product_details, many=True)
    return Response(serializer.data)
