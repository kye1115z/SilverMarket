from django.db import models

class Purchaseinfo(models.Model):
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=20)
    address = models.TextField()
    real_name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
