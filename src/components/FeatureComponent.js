import React, { Component } from "react";
import { MyContext } from "../Context";
import Title from "../components/Title";
import Room from "./Room";

export default class FeatureComponent extends Component {
  static contextType = MyContext;

  render() {
    const {featuredRooms} = this.context;
    let rooms = featuredRooms.map((room) => {
      return <Room key={room.id} room={room} />;
    });
    
    return (
      <>
        <Title title="Featured Rooms" />
        <div className="container featured-rooms">{rooms}</div>
      </>
    );
  }
}
