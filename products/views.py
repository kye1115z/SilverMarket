# products/views.py
# products/views.py
from django.shortcuts import render, get_object_or_404
from .models import Product
from .serializers import ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

#api 들

@api_view(['POST'])
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
    return render(request, 'products/products_details.html', {'product': product})

