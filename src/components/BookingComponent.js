import React, {useContext} from "react";
import { useState, useEffect } from "react";
import {MyContext} from '../Context';
import axios from "axios";

export default function BookingComponent({ room }) {
  const context = useContext(MyContext);
  const [data, setData] = useState({
    email: "",
    phone_number: "",
    checking_date: "",
    checkout_date: "",
  });
  const [isPhoneValid, setPhoneState] = useState("");
  const [isDateValid, setDateState] = useState("");

  const isValid = () => {
    const phone = /^\+?(88)?01[0-9]{9}/;
    if (!phone.test(data.phone_number)) {
      setPhoneState("Invalid Phone Number");
      return false;
    }
    setPhoneState("");
    if (new Date(data.checkout_date) < new Date(data.checking_date)) {
      setDateState("Checkout Date should be greater than Checkin Date");
      return false;
    }
    setDateState("");
    return true;
  };
  const handleSubmit = (event) => {
    console.log(event.preventDefault());
    let isFormValid = isValid();
    console.log(isFormValid);
    let bookingDate = {
      email: data.email,
      phone_number: data.phone_number,
      checking_date: data.checking_date,
      checkout_date: data.checkout_date,
      room: room.id,
      customer: 1,
    };
    if (isFormValid) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post("http://localhost:8000/hotel/book/", bookingDate, config)
        .then((response) => {
          console.log(response.data);
          setData({
            email: "",
            phone_number: "",
            checking_date: "",
            checkout_date: "",
          }, context.handleBook(room.id));
          return response.data;
        })
        .then((booked_room) => {
          console.log(booked_room);
          document.getElementById("message").innerHTML = `Congrats !! ${room.title} has been successfully booked`;
          setTimeout(function () {
            document.getElementById(
              "message"
            ).innerHTML = "";
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form className="booking-form mt-5" onSubmit={handleSubmit}>
      <div className="form-group">
        <h2 className="success-message mb-2" id="message"></h2>
      </div>
      <div className="form-group col-md-6">
        <label htmlFor="inputEmail">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          className="form-control"
          id="inputEmail"
          onChange={(event) => setData({ ...data, email: event.target.value })}
          required
        />
      </div>
      <div className="form-group col-md-6">
        <label htmlFor="inputPhoneNumber">Phone Number</label>
        <input
          type="text"
          name="phone_number"
          value={data.phone_number}
          className="form-control"
          id="inputPhoneNumber"
          onChange={(event) =>
            setData({ ...data, phone_number: event.target.value })
          }
          required
        />
      </div>
      <div className="text-danger">
        <p>{isPhoneValid}</p>
      </div>
      <div className="form-group col-md-6">
        <label htmlFor="inputCheckingDate">Checking Date</label>
        <input
          type="datetime-local"
          name="checking_date"
          value={data.checking_date}
          className="form-control"
          id="inputCheckingDate"
          onChange={(event) =>
            setData({ ...data, checking_date: event.target.value })
          }
          required
        />
      </div>
      <div className="form-group col-md-6">
        <label htmlFor="inputCheckout">Chekcout Date</label>
        <input
          type="datetime-local"
          name="checkout_date"
          value={data.checkout_date}
          className="form-control"
          id="inputCheckout"
          onChange={(event) =>
            setData({ ...data, checkout_date: event.target.value })
          }
          required
        />
      </div>
      <div className="text-danger">
        <p>{isDateValid}</p>
      </div>
      <button type="submit" className="btn btn-primary">
        {" "}
        Book
      </button>
    </form>
  );
}
