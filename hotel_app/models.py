from django.db import models
from django.contrib.auth.models import User

TYPE = (
    ('A', 'Air Conditioned'),
    ('NA', 'Non Air Conditioned')
)


class Room(models.Model):
    title = models.CharField(max_length=30)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    price_per_night = models.DecimalField(max_digits=8, decimal_places=3)
    room_slug = models.SlugField()
    is_booked = models.BooleanField(default=False)
    capacity = models.IntegerField()
    room_size = models.CharField(max_length=5)
    cover_image = models.ImageField(null=True, upload_to='room_cover')
    # display_images = models.FileField(upload_to='display_images')
    featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Category(models.Model):
    category_name = models.CharField(max_length=30)

    def __str__(self):
        return self.category_name


class Customer(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.customer


class Booking(models.Model):
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)
    room = models.ForeignKey('Room', on_delete=models.CASCADE)

    def __str__(self):
        return self.customer


class Payment(models.Model):
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)

    def __str__(self):
        return self.customer


class CheckIn(models.Model):
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)
    check_in_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer


class CheckOut(models.Model):
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)
    check_out_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer


# class RoomDisplayImages(models.Model):
#     room = models.ForeignKey(Room)
#     image = models.ImageField()
