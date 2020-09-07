import React, { Component } from "react";
import { MyContext } from "../Context";
import Title from "../components/Title";
import Room from "./Room";

export default class FeatureComponent extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      featuredRooms: [],
    };
  }

  componentDidMount() {
    const rooms = this.context.rooms.filter((room) => room.featured);
    this.setState({
      featuredRooms: [...rooms],
    });
  }

  render() {
    // const { featuredRooms } = this.state;
    const featuredRooms = this.context.rooms.filter(room => room.featured);
    // console.log("rooms from feature component", this.context.rooms);
    const rooms = featuredRooms.map((room) => {
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
