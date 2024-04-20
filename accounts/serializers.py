from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password2 = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password2')

    def validate_email(self, email):
        if User.objects.filter(email=email):
            raise serializers.ValidationError("Email already exists")
        return email

    def validate_password2(self, password2):
        password1 = self.initial_data.get("password")
        if password1 and password2 and password1 != password2:
            raise serializers.ValidationError("Passwords mismatched")
        return password2
    
    def create(self, validated_data):
        instance = User.objects.create(
            username=validated_data.get("username"),
            email=validated_data.get("email"),
            password=validated_data.get("password2")
        )
        instance.set_password(validated_data.get("password"))
        instance.save()
        return instance
