import React, { useContext } from "react";
import { MyContext } from "../Context";

export default function SingleRommPage({ match }) {
  const context = useContext(MyContext);
  let singleRoom = [];
  const room = context.rooms.find(
    (room) => room.room_slug === match.params["room_slug"]
  );
  if (!room) {
    return <div>Loading...........</div>;
  } else {
    return <div>{room.title}</div>;
  }
}
