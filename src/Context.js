import React, { Component } from "react";
import axios from "axios";
import { getUniqueValues } from "../src/components/RoomsFilter";
export const MyContext = React.createContext();

class Context extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      sortedRooms: [],
      featuredRooms: [],
      loading: true,
      category_name: "all",
      capacity: "1",
      price_per_night: 0,
      maxPrice: 0,
      minPrice: 0,
      maxRoomSize: 0,
      minRoomSize: 0,
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/hotel/get_room_list/")
      .then((respone) => {
        let featured = respone.data.filter((room) => room.featured);
        let minPrice = parseInt(
          Math.min(...getUniqueValues(respone.data, "price_per_night"))
        );
        let maxPrice = parseInt(
          Math.max(...getUniqueValues(respone.data, "price_per_night"))
        );
        let maxRoomSize = parseInt(
          Math.max(...getUniqueValues(respone.data, "room_size"))
        );
        let minRoomSize = parseInt(
          Math.min(...getUniqueValues(respone.data, "room_size"))
        );
        this.setState({
          rooms: respone.data,
          sortedRooms: respone.data,
          featuredRooms: featured,
          price_per_night: maxPrice,
          minPrice: minPrice,
          maxPrice: maxPrice,
          maxRoomSize: maxRoomSize,
          minRoomSize: minRoomSize,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getType = () => {
    let types = this.rooms.map((room) => room.category);
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // filterRooms is a call back function. This will be called only afer the state changes.
    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    let {
      rooms,
      sortedRooms,
      category_name,
      capacity,
      price_per_night,
      minRoomSize,
      maxRoomSize
    } = this.state;
    let filtredRooms = [...rooms];
    if (category_name !== "all") {
      filtredRooms = filtredRooms.filter(
        (room) => room.category_name === category_name
      );
    }
    if (capacity !== "1") {
      filtredRooms = filtredRooms.filter(
        (room) => room.capacity >= parseInt(capacity)
      );
    }

    filtredRooms = filtredRooms.filter(
      (room) => room.price_per_night <= parseInt(price_per_night)
    );
    filtredRooms = filtredRooms.filter(
      (room) =>
        room.room_size >= parseInt(minRoomSize) &&
        room.room_size <= parseInt(maxRoomSize)
    );

    this.setState({
      sortedRooms: filtredRooms,
    });
  };

  render() {
    return (
      <MyContext.Provider
        value={{ ...this.state, handleChange: this.handleChange }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
export default Context;
