# products/views.py
# products/views.py
from django.shortcuts import render, get_object_or_404
from .models import Product
from .serializers import ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

#api 들

@api_view(['POST'])
@csrf_exempt
def products_create(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


def products_form(request):
    return render(request, 'products/products_form.html')


def products_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    serializer = ProductSerializer(product)
    return render(request, 'products/products_detail.html', {'product': product})

@api_view(['GET'])
def user_products_search(request):
    user_id = request.GET.get('user_id')
    if user_id is not None:
        products = Product.objects.filter(id=user_id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=200)
    else:
        return Response({'message': 'Please provide a user_id parameter.'}, status=400)

@login_required
def user_products_list(request):
    user_id = request.user.id
    user_products = Product.objects.filter(id=user_id) #특정 유저 id 검색
    return render(request, 'products/user_products_list.html', {'products': user_products})

