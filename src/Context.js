import React, { Component } from "react";
import axios from "axios";
import { getUniqueValues } from "../src/components/RoomsFilter";
import { Redirect } from "react-router-dom";

export const MyContext = React.createContext();

class Context extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      isUserAuthenticated: false,
      token: "",
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
      .then((response) => {
        let featured = response.data.filter((room) => room.featured);
        let minPrice = parseInt(
          Math.min(...getUniqueValues(response.data, "price_per_night"))
        );
        let maxPrice = parseInt(
          Math.max(...getUniqueValues(response.data, "price_per_night"))
        );
        let maxRoomSize = parseInt(
          Math.max(...getUniqueValues(response.data, "room_size"))
        );
        let minRoomSize = parseInt(
          Math.min(...getUniqueValues(response.data, "room_size"))
        );
        let token = localStorage.getItem("access-token");
        let username = "";
        let auth = false;
        if (token) {
          auth = true;
          username = localStorage.getItem("username");
        }

        this.setState({
          isUserAuthenticated: auth,
          username: username,
          token: token,
          rooms: response.data,
          sortedRooms: response.data,
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
      maxRoomSize,
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

  createAlert(message, type, id_of_alert_tag) {
    let alert_location = document.querySelector(`#${id_of_alert_tag}`);
    alert_location.setAttribute("class", `alert alert-${type}`);
    let link = document.createElement("a");
    let link_id = "close-alert";
    let link_text = document.createTextNode("  " + "X");
    link.setAttribute("href", "#");
    link.setAttribute("id", link_id);
    link.appendChild(link_text);
    alert_location.innerHTML = message;
    alert_location.appendChild(link);
    alert_location.style.display = "block";
    let link_action = document.querySelector(`#${link_id}`);
    link_action.addEventListener(
      "click",
      () =>
        (document.querySelector("#login-error-header").style.display = "none")
    );
  }

  handleLogin = (event, data) => {
    event.preventDefault();
    // const { username, password } = this.state;
    const credentials = {
      username: data.username,
      password: data.password,
    };
    axios
      .post("http://localhost:8000/accounts/login/", credentials)
      .then((response) => {
        console.log("response status", response.data);
        this.setState({
          isUserAuthenticated: true,
          username: credentials.username,
        });
        const token = response.data["access"];
        const user_id = response.data["user_id"];
        const username = response.data["username"];
        localStorage.setItem("access-token", token);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("username", username);
        return <Redirect to="/rooms" />;
      })
      .catch((e) => {
        this.createAlert(
          "Unautherized Credentials",
          "warning",
          "login-error-header"
        );
      });
  };

  handleBook = (id) => {
    this.state.rooms.forEach((room) => {
      if (room.id === id) {
        room.is_booked = true;
      }
    });
  };

  handleLogout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    this.setState({
      isUserAuthenticated: false,
      username: "",
      token: "",
    });
    return <Redirect to="/" />;
  };

  handleRegister = (event, data) => {
    event.preventDefault();
    console.log("register");
    axios
      .post("http://localhost:8000/accounts/register/", data)
      .then((response) => {
        console.log(response.data["response"]);
        return <Redirect to="/login" />;
      })
      .catch((error) => {
        alert(`${error.response.data["response"]}`);
      });
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          ...this.state,
          handleChange: this.handleChange,
          login: this.handleLogin,
          logout: this.handleLogout,
          register: this.handleRegister,
          handleBook: this.handleBook,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
export default Context;
