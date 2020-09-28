import React, { useContext } from "react";
import { useState } from "react";
import { MyContext } from "../Context";
import axios from "axios";
import { Link } from "react-router-dom";
import TextInput from "../components/TextInput";

export default function BookingComponent({ room }) {
  const context = useContext(MyContext);
  const token = context.token;
  const user_id = parseInt(context.user_id);
  const [data, setData] = useState({
    email: "",
    phone_number: "",
    checking_date: "",
    checkout_date: "",
  });

  const isValid = () => {
    const phone = /^\+?(88)?01[0-9]{9}/;
    if (!phone.test(data.phone_number)) {
      document.getElementById("phoneID").style.display = "block";
      document.getElementById("phone").innerHTML = "Invalid Phone Number";
      return false;
    }
    document.getElementById("phoneID").style.display = "none";
    document.getElementById("phone").innerHTML = "";
    if (new Date(data.checkout_date) < new Date(data.checking_date)) {
      document.getElementById("checkoutID").style.display = "block";
      document.getElementById("checkout").innerHTML =
        "Checkout Date should be greater than Checkin Date";
      return false;
    }
    document.getElementById("checkoutID").style.display = "none";
    document.getElementById("checkout").innerHTML = "";
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let isFormValid = isValid();
    let bookingDate = {
      email: data.email,
      phone_number: data.phone_number,
      checking_date: data.checking_date,
      checkout_date: data.checkout_date,
      room: room.id,
      customer: user_id,
    };
    if (isFormValid) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post("/hotel/book/", bookingDate, config)
        .then((response) => {
          setData(
            {
              email: "",
              phone_number: "",
              checking_date: "",
              checkout_date: "",
            },
            context.handleBook(room.id)
          );
          return response.data;
        })
        .then((response) => {
          document.getElementById(
            "common-message"
          ).innerHTML = `${response["response"]}`;
          setTimeout(function () {
            document.getElementById("common-message").innerHTML = "";
          }, 3000);
        })
        .catch((error) => {
        });
    }
  };
  return (
    <form className="booking-form mt-5" onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-md-6 m-auto text-center">
          {/* <p className="success-message mb-2 font-weight-bold" id="message"></p> */}
          <Link to={`/single-room/${room.room_slug}`} role="button">
            <button>Goto Room</button>
          </Link>
        </div>
      </div>

      <div className="row">
        <TextInput
          divClass="form-group col-md-6 m-auto"
          htmlForLabel="inputEmail"
          labelName="Email"
          inputClass="form-control"
          inputType="email"
          inputName="email"
          inputValue={data.email}
          inputPlaceHolder="Enter Email"
          onChange={(event) => setData({ ...data, email: event.target.value })}
          required={true}
        />
      </div>

      <div className="row">
        <TextInput
          divClass="form-group col-md-6 m-auto"
          htmlForLabel="inputPhoneNumber"
          labelName="Phone Number"
          inputClass="form-control"
          inputType="text"
          inputName="phone_number"
          inputValue={data.phone_number}
          inputPlaceHolder="Enter Phone Number"
          onChange={(event) =>
            setData({ ...data, phone_number: event.target.value })
          }
          required={true}
        />
      </div>

      <div className="row" id="phoneID" style={{ display: "none" }}>
        <div className="form-group col-md-6 m-auto text-danger">
          <p id="phone"></p>
        </div>
      </div>

      <div className="row">
        <TextInput
          divClass="form-group col-md-6 m-auto"
          htmlForLabel="inputCheckingDate"
          labelName="Checking Date"
          inputClass="form-control"
          inputType="datetime-local"
          inputName="checking_date"
          inputValue={data.checking_date}
          inputPlaceHolder="Enter Checking Date"
          onChange={(event) =>
            setData({ ...data, checking_date: event.target.value })
          }
          required={true}
        />
      </div>

      <div className="row">
        <TextInput
          divClass="form-group col-md-6 m-auto"
          htmlForLabel="inputCheckoutDate"
          labelName="Checkout Date"
          inputClass="form-control"
          inputType="datetime-local"
          inputName="checkout_date"
          inputValue={data.checkout_date}
          inputPlaceHolder="Enter Checkout Date"
          onChange={(event) =>
            setData({ ...data, checkout_date: event.target.value })
          }
          required={true}
        />
      </div>

      <div className="row" id="checkoutID" style={{ display: "none" }}>
        <div className="form-group col-md-6 m-auto text-danger">
          <p id="checkout"></p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 m-auto text-center">
          <button type="submit" className="btn btn-primary px-5 my-3">
            Book
          </button>
        </div>
      </div>
    </form>
  );
}
