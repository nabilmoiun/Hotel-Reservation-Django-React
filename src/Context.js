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
      user_id: "",
      isUserAuthenticated: false,
      token: "",
      isAdmin: false,
      rooms: [],
      sortedRooms: [],
      featuredRooms: [],
      checkedInRooms: [],
      filteredCheckedInRooms: [],
      loading: true,
      category_name: "all",
      capacity: "1",
      price_per_night: 0,
      maxPrice: 0,
      minPrice: 0,
      maxRoomSize: 0,
      minRoomSize: 0,
      reserved: false,
      searchKey: "",
    };
  }
  componentDidMount() {
    axios
      .get("/hotel/get_room_list/")
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
        let user_id = "";
        let is_admin = false;
        if (token) {
          auth = true;
          username = localStorage.getItem("username");
          user_id = localStorage.getItem("user_id");
          is_admin = localStorage.getItem("is_admin");
          is_admin = is_admin === "true" ? true : false;
        }

        this.setState({
          isUserAuthenticated: auth,
          username: username,
          user_id: user_id,
          token: token,
          isAdmin: is_admin,
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
      .then((response) => {
        if (this.state.isAdmin) {
          this.setCheckedInRooms();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

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
      category_name,
      capacity,
      price_per_night,
      minRoomSize,
      maxRoomSize,
      reserved,
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

    if (reserved) {
      filtredRooms = filtredRooms.filter((room) => room.is_booked === false);
    }
    this.setState({
      sortedRooms: filtredRooms,
    });
  };

  createAlert(message, type, id_of_alert_tag) {
    let alert_location = document.querySelector(`#${id_of_alert_tag}`);
    alert_location.setAttribute("class", `alert alert-${type}`);
    let link = document.createElement("a");
    let link_id = "close-alert";
    let link_text = document.createTextNode(`  X`);
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

  handleLogin = (event, data, history) => {
    event.preventDefault();
    const credentials = {
      username: data.username,
      password: data.password,
    };
    axios
      .post("/accounts/login/", credentials)
      .then((response) => {
        this.setState(
          {
            isUserAuthenticated: true,
            username: credentials.username,
            token: response.data["access"],
            user_id: response.data["user_id"],
            isAdmin: response.data["is_admin"],
          },
          this.setCheckedInRooms
        );
        const token = response.data["access"];
        const user_id = response.data["user_id"];
        const username = response.data["username"];
        const is_admin = response.data["is_admin"];
        localStorage.setItem("access-token", token);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("username", username);
        localStorage.setItem("is_admin", is_admin);
      })
      .catch((e) => {
        document.getElementById("login-error-header").innerHTML =
          "Unauthorized Credentials";
        setTimeout(function () {
          document.getElementById("login-error-header").innerHTML = "";
        }, 4000);
      });
  };

  setCheckedInRooms = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };
    if (this.state.isAdmin) {
      axios
        .get(
          "/hotel/get_current_checked_in_rooms/",
          config
        )
        .then((response) => {
          this.setState({
            checkedInRooms: response.data,
            filteredCheckedInRooms: response.data,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  handleCheckOut = (room_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      },
    };
    axios
      .post("/hotel/checkout/", { pk: room_id }, config)
      .then((response) => {
        this.state.rooms.forEach((room) => {
          if (room.id === room_id) {
            room.is_booked = false;
          }
        });
        let updateCheckedInRooms = this.state.checkedInRooms.filter(
          (room) => room.room_id !== room_id
        );
        this.setState({
          checkedInRooms: updateCheckedInRooms,
          filteredCheckedInRooms: updateCheckedInRooms,
        });
        document.getElementById(
          "common-message"
        ).innerHTML = response.data;
        setTimeout(function () {
          document.getElementById("common-message").innerHTML = "";
        }, 3000);
      })
      .catch((error) => {
        console.log(error.message);
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
    localStorage.removeItem("is_admin");
    this.setState({
      isUserAuthenticated: false,
      username: "",
      token: "",
      user_id: "",
      isAdmin: false,
    });
    return <Redirect to="/" />;
  };

  handleRegister = (event, data, history) => {
    event.preventDefault();
    axios
      .post("/accounts/register/", data)
      .then((response) => {
        history.push("/login");
      })
      .catch((error) => {
        document.getElementById("register-message").innerHTML =
          error.response.data["response"];
      });
  };

  handleSearchKey = (event) => {
    this.setState(
      {
        searchKey: event.target.value,
      },
      this.filterCheckedInRooms
    );
  };

  filterCheckedInRooms = () => {
    if (this.state.searchKey !== "") {
      let searchedRooms = this.state.filteredCheckedInRooms.filter((room) =>
        room.room_slug.toString().includes(this.state.searchKey)
      );
      this.setState({
        filteredCheckedInRooms: searchedRooms,
      });
    } else {
      this.setState({
        filteredCheckedInRooms: this.state.checkedInRooms,
      });
    }
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
          checkout: this.handleCheckOut,
          searchBy: this.handleSearchKey,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
export default Context;
