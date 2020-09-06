import React from 'react'
import {Link} from 'react-router-dom';

export default function NavbarComponent() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto">
            <Link to='/' className="nav-link">
            <li className="nav-item">
              Home
            </li>
            </Link>
            <Link to='/rooms' className="nav-link">
            <li className="nav-item">
              Rooms
            </li>
            </Link>
            <Link to='/single-room' className="nav-link">
            <li className="nav-item">
              Single Room
            </li>
            </Link>
          </ul>
        </div>
      </nav>
    )
}
