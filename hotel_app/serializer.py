from .models import Room
from rest_framework import serializers


class RoomSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.category_name')
    class Meta:
        model = Room
        fields = '__all__'
        
    def create(self, validated_data):
        return super().create(self.category_name)
