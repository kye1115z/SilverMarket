# accounts/views.py

from imaplib import _Authenticator
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User
from rest_framework.permissions import IsAuthenticated

#로그인 POST api
class Login(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return Response({"detail": "로그인 완료"}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "계정이 존재하지 않습니다!"}, status=status.HTTP_401_UNAUTHORIZED)
        
#회원가입 POST api
class Register(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")
        phone = request.data.get("phone")
        address = request.data.get("address")
        
        if not (username and password and email and phone):
            return Response({"detail": "누락된 값이 존재합니다"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({"detail": "Username 이 이미 존재합니다."}, status=status.HTTP_400_BAD_REQUEST)
        
        User.objects.create_user(username=username, password=password, email = email, phone = phone, address = address)
        
        return Response({"detail": "회원가입이 성공적으로 완료되었습니다!"}, status=status.HTTP_201_CREATED)

#로그아웃 POST api
class Logout(APIView):
    def post(self, request):
        logout(request)
        return Response({"detail": "로그아웃 완료"}, status=status.HTTP_200_OK)

#회원탈퇴 DELETE api
class DeleteAccount(APIView):
    permission_classes = [IsAuthenticated] # 로그인 사용자만 이용 가능

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"detail": "회원탈퇴가 완료되었습니다."}, status=status.HTTP_200_OK)
