from products.models import Product
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from .serializers import ProductSerializer
from .serializers import ProductListSerializer, ProductDetailSerializer
from django.http import HttpResponse, FileResponse
from .models import Product
from django.http import FileResponse, HttpResponse
from django.shortcuts import get_object_or_404
import mimetypes




# 이미지 파일 url로 변환 시, serializer 안에 context={'request': request} 추가

#상품 정보 등록(POST), 등록된 상품 전체 조회(GET) api -> 상품의 상세 정보를 post하고, 모든 상품 리스트의 상세 정보를 get
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
        else:
            print(serializer.errors)
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

#상품 사진, 상품명, 가격만을 반환하는 홈화면을 위한 GET api
@api_view(['GET'])
def simple_product_list(request):
    products = Product.objects.all()
    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data)

#상품 클릭 시 이동하는 디테일 정보 페이지 GET api
#특정 상품의 상세 뷰를 반환하는 api는 클래스 기반 뷰로 만들었습니당
class ProductDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductDetailSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

#이미지를 보이도록 전송하는 api(postman 통신 시 이미지 그대로 출력)
class GetProductImage(APIView):
    def get(self, request, id):
        product = get_object_or_404(Product, id=id)
        image = product.photo
        if image:
            file_path = image.path

            #파일의 확장자를 사용하여 적절한 MIME 타입을 얻어옴
            content_type, encoding = mimetypes.guess_type(file_path)
            if content_type is None:
                content_type = 'application/octet-stream' #알 수 없는 파일 타입에 대한 기본값
            
            #파일을 열고 닫지 않고 바로 응답으로 보내기(중요!)
            file = open(file_path, 'rb')
            response = FileResponse(file, content_type=content_type)
            return response
        else:
            return HttpResponse('이미지가 없습니다.', status=404)
        

        

        

            
    
    


