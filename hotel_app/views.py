from django.shortcuts import render


from .models import Room
from .serializer import RoomSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView


class RoomView(ListAPIView):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()


class RoomDetailView(RetrieveAPIView):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()
    lookup_field = 'room_slug'
