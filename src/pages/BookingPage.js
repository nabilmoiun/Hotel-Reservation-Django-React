import React, { useContext } from "react";
import BookingComponent from "../components/BookingComponent";

export default function BookingPage({ location }) {
  const room = location.state;
  if (room.is_booked) {
    return <div>The room is currently resereved</div>;
  }
  return (
    <div className="container">
      <BookingComponent room={room} />
    </div>
  );
}
