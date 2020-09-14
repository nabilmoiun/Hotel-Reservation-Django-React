import React, { useContext } from "react";
import BookingComponent from "../components/BookingComponent";
import LoginPage from "../pages/LoginPage";
import { MyContext } from "../Context";
import { Redirect } from "react-router-dom";
export default function BookingPage({ history, location }) {
  const context = useContext(MyContext);
  if (!location.state) {
    return <Redirect to="/rooms" />;
  }
  const room = location.state.room;
  if (!context.isUserAuthenticated) {
    return <LoginPage history={history} location={location} />;
  }
  return (
    <div className="container">
      <BookingComponent room={room} />
    </div>
  );
}
