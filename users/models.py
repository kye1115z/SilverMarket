from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
   phone = models.CharField(verbose_name = '전화번호', max_length=11)
   address = models.TextField(verbose_name = '주소',null = True)
   

