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
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <div className="container-fluid">
      <NavbarComponent />
      <Switch>
        <Route exact path="/" render={(props) => <HomePage {...props} />} />
        <Route path="/rooms" render={(props) => <RoomPage {...props} />} />
        <Route
          path="/single-room/:room_slug"
          render={(props) => <SingleRoomPage {...props} />}
        />
        <Route
          path="/book/:room_id"
          render={(props) => <BookingPage {...props} />}
        />
        <Route path="/login" render={(props) => <LoginPage {...props} />} />
        <Route
          path="/register"
          render={(props) => <RegisterPage {...props} />}
        />
        <Route path="/dashboard" render={(props) => <Dashboard {...props}/>}/>
        <Route render={(props) => <ErrorPage {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
