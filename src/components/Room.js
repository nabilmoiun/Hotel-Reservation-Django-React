import React from "react";
import {Link} from 'react-router-dom';
export default function Room({ room }) {
    const {cover_image, title, price_per_night, room_slug} = room
  return (
    <div className="card room">
      <Link to={`/single-room/${room_slug}`}>
        <img className="card-img-top img-fluid room-image" src={cover_image} alt="" />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text font-weight-bold">$ {price_per_night}</p>
      </div>
    </div>
  );
}
