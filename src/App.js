import React from "react";
import "./App.css";
import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Route, Switch } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";
import SingleRoomPage from "./pages/SingleRommPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
function App() {
  return (
    <div className="container-fluid">
      <NavbarComponent />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/rooms" component={RoomPage} />
        <Route path="/single-room/:room_slug" component={SingleRoomPage} />
        <Route path="/book/:room_id" component={BookingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
