from django.urls import path
from . import views
from accounts import views

app_name = 'accounts'

urlpatterns = [
    path('signup/', views.Register.as_view(), name='signup'),
    path('login/', views.Login.as_view(), name='login'),
    path('logout/', views.Logout.as_view(), name='logout'),
    path('delete/', views.DeleteAccount.as_view(), name='DeleteAccount'),
]
