from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer
from django.db.models import Q

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
    
# @api_view(['GET'])
# def products_by_writer(request):
    # writer_nickname = request.GET.get('writer')
    
    # if writer_nickname:
        # products = Product.objects.filter(writer__username=writer_nickname)
        # serializer = ProductSerializer(products, many=True)
        # return Response(serializer.data)
    
    # return Response({"message": "No writer specified."}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def products_by_writer(request, writer_id):
    products = Product.objects.filter(writer_id=writer_id)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def products_by_category(request, category_id):
    products = Product.objects.filter(category=category_id)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

