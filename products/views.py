# products/views.py
# products/views.py
from django.shortcuts import render, get_object_or_404
from .models import Product
from .serializers import ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from users.models import User

#api 들

@login_required
@api_view(['POST'])
def products_create(request):
    print("Test")
    print(str(request))
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(writer = request.user)
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
    print(request.GET)
    userName = request.GET.get('user_id')
        
    if userName == "":
        return Response({'message': 'Please provide a user_id parameter.'}, status=400)
    
    try:
        user = User.objects.get(username = userName) 
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=404)
    
    products = Product.objects.filter(writer = user)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=200, content_type="application/json")

@login_required
def user_products_list(request):
    user_id = request.user.id
    print('현재 user id: ' + str(user_id) )
    
    user_products = Product.objects.filter(writer = request.user) #내가 쓴 글만 조회, 만약 특정 유저? -> 그 유저의 id를 request.user 자리에 넣기
    #print('user products: ' +  str(user_products) )
    return render(request, 'products/user_products_list.html', {'products': user_products})

