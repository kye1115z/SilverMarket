from django.db import models
from users.models import User

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    photo = models.ImageField(upload_to='products/')
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    weight = models.FloatField()
    description = models.TextField()
    writer = models.ForeignKey(User, null = True ,on_delete= models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'products'
        
class Product_details(models.Model):
    id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=50)
    writer = models.ForeignKey(User, null = True ,on_delete= models.CASCADE)
    
    photo = models.ImageField(upload_to='products/') #판매자 사진
    person_name = models.CharField(max_length=100) #판매자 이름
    products_name = models.CharField(max_length=100) #상품명
    price = models.CharField(max_length=100) #상품가격
    
    hometown = models.CharField(max_length=100) #원산지
    organize = models.CharField(max_length=100) #구성
    all_weight = models.FloatField() #총 중량
    one_weight = models.FloatField() #개당 중량
    description = models.TextField() #상세설명
    

    def __str__(self):
        return self.products_name

    class Meta:
        app_label = 'products'
        



