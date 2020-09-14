import React, { useContext } from "react";
import { MyContext } from "../Context";
import RoomsFilter from "../components/RoomsFilter";
import Title from "../components/Title";
import RoomList from "../components/RoomList";

export default function RoomPage() {
  const contextData = useContext(MyContext);
  const { sortedRooms } = contextData;
  return (
    <>
      <div className="container">
        <Title title="Filter Rooms" />
        <RoomsFilter />
        <Title title="Rooms" />
        <div className="room-list">
          {sortedRooms.length === 0 ? (
            <h3> No room found </h3>
          ) : (
            <RoomList rooms={sortedRooms} />
          )}
        </div>
      </div>
    </>
  );
}
