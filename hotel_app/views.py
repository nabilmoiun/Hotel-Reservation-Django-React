from django.shortcuts import get_object_or_404
from .models import Room, Booking
from .serializer import RoomSerializer, BookingSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.permissions import AllowAny


class RoomView(ListAPIView):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()


class RoomDetailView(RetrieveAPIView):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()
    lookup_field = 'room_slug'


class BookingCreateApiView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()

    def post(self, request, *args, **kwargs):
        room = get_object_or_404(Room, pk=request.data['room'])
        room.is_booked = True
        room.save()
        return self.create(request, *args, **kwargs)

