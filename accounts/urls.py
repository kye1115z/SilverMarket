from django.urls import path

from .views import signup_view,login_view,check_view,logout_view

app_name = 'accounts'

urlpatterns = [
    path('signup/', signup_view, name= 'signup'),
    path('login/', login_view, name= 'login'),
    path('check/', check_view, name='check'),
    path('logout/', logout_view, name= 'logout'),
]
