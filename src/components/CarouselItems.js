import React from "react";
import { Link } from "react-router-dom";

export default function CarouselItems({ data }) {
  const items = data.map((d, index) => (
    <div className="carousel-item" key={index}>
      <Link to={`/single-room/${index + 1}`}>
        <img className="d-block w-100" src={d} alt="Fourth slide" />
      </Link>
      <div className="carousel-caption d-none d-md-block">
        <h5>image - {index + 1}</h5>
        <p>Paragraph</p>
      </div>
    </div>
  ));
  return <>{items}</>;
}
