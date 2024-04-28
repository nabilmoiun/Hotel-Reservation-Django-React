# Hotel-Reservation-Site

The site is developed to mainly focus on displaying and filtering different rooms by criterion. I have developed the project to focus on the integration of reactjs and with the django rest framework to gain knowledge on the fundamentals of react.

# Features

+ Display Different Rooms & Services of Hotel
+ Filter Rooms by dynamic creteria such as Category, Price, Capacity & Availability
+ Authentication Process
+ Adding Likes To Product
+ Booking Rooms
+ Check-in & Checkout

# Demo

To view a video demo of the app go to the following link
https://youtu.be/8Yv6eQSGK0w

# Usage

You must have nodejs and python installed on your machine to make use of this app.


    git clone https://github.com/nabilmoiun/Hotel-Reservation-Django-React.git
    cd Hotel-Reservation-Django-React
    pip install -r requirements.txt
    npm i
    python manage.py makemigrations
    python manage.py migrate

Create a superuser:

    python manage.py createsuperuser
    
Run the backend: 

    python manage.py runserver

Run frontend in another shell:

    npm start

Login to admin panel using superuser credentials Add some categories and rooms as per your requirements from the below link:

    http://localhost:8000/admin/

Logout and hit the below link in the browser to get the app working.

    http://localhost:3000/



