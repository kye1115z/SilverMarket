from rest_framework import serializers
from .models import Purchaseinfo

class PurchaseinfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'name',
            'contact',
            'address',
            'real_name',
        )
        model = Purchaseinfo