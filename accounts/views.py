from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.models import User
from .serializers import UserSerializer


class MyTokenObtainSerilizer(TokenObtainPairSerializer):
    # serializer_class = TokenObtainPairSerializer

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


class UserView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def post(self, request, *args, **kwargs):
        post_data = dict(request.data)
        user_name = User.objects.filter(username=post_data['username'])
        if user_name.exists():
            return Response({"response": "username already taken"}, status=status.HTTP_400_BAD_REQUEST)
        email = User.objects.filter(email=post_data['email'])
        if email.exists():
            return Response({"response": "email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        if post_data['password1'] != post_data['password2']:
            return Response({"response": "Passwords don't match"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=post_data['username'],
            email=post_data['email'],
            password=post_data['password1']
        )

        new_user = {
            "response": "Your Registration Is Successful",
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
        user.set_password(post_data['password1'])
        user.save()
        return Response(new_user, status=status.HTTP_200_OK)
