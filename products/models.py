from django.db import models
from users.models import User

#상품 등록, 불러오기, 유저/카테고리별 조회에 이용되는 기본 products 모델
#디테일 페이지 역시 이 모델을 사용할 수 있도록 수정함(08.15)
class Product(models.Model):
    id = models.AutoField(primary_key=True) #등록된 상품의 인덱스 번호
    photo = models.ImageField(upload_to='products/') #상품 사진
    products_name = models.CharField(max_length=100) #상품명
    price = models.CharField(max_length=100) #상품가격
    category = models.CharField(max_length=50) #상품 카테고리
    whole_weight = models.FloatField() #상품의 총중량
    separate_weight = models.FloatField() #개당 중량
    hometown = models.CharField(max_length=100) #원산지
    organize = models.CharField(max_length=100) #구성
    
    seller_photo = models.ImageField(upload_to='products/') #판매자 사진
    person_name = models.CharField(max_length=100) #판매자 이름
    
    description = models.TextField() #상품설명
    writer = models.ForeignKey(User, null = True ,on_delete= models.CASCADE) #상품등록 글 작성자 id
    
    bank_name = models.CharField(max_length=100) #예금주 이름
    bank = models.CharField(max_length=100) #은행 이름
    bank_number = models.CharField(max_length=100) #계좌번호

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'products'





