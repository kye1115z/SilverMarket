from django.urls import path
from .views import signup_view,login_view,check_view,logout_view
from accounts import views

app_name = 'accounts'

urlpatterns = [
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('check/', views.check_view, name='check'),
    path('logout/', views.logout_view, name='logout'),
]
