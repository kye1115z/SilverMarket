from django.db import models

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    photo = models.ImageField(upload_to='products/')
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    weight = models.FloatField()
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'products'

