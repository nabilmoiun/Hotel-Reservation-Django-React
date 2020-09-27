from django.contrib import admin
from django.urls import path, include
from .views import RoomView, RoomDetailView, BookingCreateApiView, CheckoutView, CheckedInView

app_name = 'hotel_app'

urlpatterns = [
    path('get_room_list/', RoomView.as_view(), name="room_list"),
    path('get_a_room_detail/<str:room_slug>/', RoomDetailView.as_view(), name="single_room"),
    path('book/', BookingCreateApiView.as_view(), name='book_room'),
    path('checkout/', CheckoutView.as_view(), name="checkout"),
    path('get_current_checked_in_rooms/', CheckedInView.as_view(), name="checked_in_rooms"),
]
