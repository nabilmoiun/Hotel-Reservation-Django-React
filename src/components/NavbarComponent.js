import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../Context";
export default function NavbarComponent() {
  const context = useContext(MyContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav m-auto">
          <Link to="/" className="nav-link">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="/rooms" className="nav-link">
            <li className="nav-item">Rooms</li>
          </Link>
          {context.isUserAuthenticated ? (
            <Link
              to="/"
              className="nav-link"
              role="button"
              onClick={context.logout}
            >
              <li className="nav-item">Logout</li>
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                <li className="nav-item">Login</li>
              </Link>
              <Link to="/register" className="nav-link">
                <li className="nav-item">Register</li>
              </Link>
            </>
          )}
          {context.isAdmin && context.isUserAuthenticated ? (
            <Link to="/dashboard" className="nav-link">
              <li className="nav-item">Dashboard</li>
            </Link>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
    <div className="container">
      <div className="row justify-content-center pt-3">
      <p className="success-message font-weight-bold" id="common-message"></p>
      </div>
    </div>
    </>
    
  );
}
