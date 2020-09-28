from django.shortcuts import get_object_or_404
from .models import Room, Booking, CheckIn
from .serializer import RoomSerializer, BookingSerializer, CheckinSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status


class RoomView(ListAPIView):
    serializer_class = RoomSerializer
    queryset = Room.objects.order_by('-id')


class RoomDetailView(RetrieveAPIView):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()
    lookup_field = 'room_slug'


class BookingCreateApiView(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()

    def create(self, request, *args, **kwargs):
        response = {}
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        response['data'] = serializer.data
        response['response'] = "Room is successfully booked"
        return Response(response, status=status.HTTP_201_CREATED, headers=headers)

    def post(self, request, *args, **kwargs):
        room = get_object_or_404(Room, pk=request.data['room'])
        if room.is_booked:
            return Response({"response": "Room is already booked"}, status=status.HTTP_200_OK)
        room.is_booked = True
        room.save()
        checked_in_room = CheckIn.objects.create(
            customer=request.user,
            room=room,
            phone_number=request.data['phone_number'],
            email=request.data['email']
        )
        checked_in_room.save()
        return self.create(request, *args, **kwargs)


class CheckoutView(APIView):
    def post(self, request):
        room = get_object_or_404(Room, pk=request.data['pk'])
        checked_in_room = CheckIn.objects.get(room__pk=request.data['pk'])
        print(checked_in_room)
        room.is_booked = False
        room.save()
        checked_in_room.delete()
        return Response({"Checkout Successful"}, status=status.HTTP_200_OK)


class CheckedInView(ListAPIView):
    permission_classes = (IsAdminUser, )
    serializer_class = CheckinSerializer
    queryset = CheckIn.objects.order_by('-id')
