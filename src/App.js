import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Route, Switch } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";
import SingleRoomPage from "./pages/SingleRommPage";
import ErrorPage from "./pages/ErrorPage";
function App() {
  return (
    <div className="container-fluid">
      <NavbarComponent />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/rooms" component={RoomPage} />
        <Route path="/single-room/:id" component={SingleRoomPage} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
