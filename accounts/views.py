from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .serializers import UserSerializer
from django.contrib.auth.models import User


class MyTokenObtainSerilizer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        # Add your required response and other parameters here
        data['username'] = self.user.username
        data['user_id'] = self.user.pk
        data['is_admin'] = self.user.is_staff
        data['message'] = "login successful"

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainSerilizer



class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

