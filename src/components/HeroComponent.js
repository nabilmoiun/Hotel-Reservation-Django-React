import React from "react";
import { Link } from "react-router-dom";
import CarouselItems from "./CarouselItems";
export default function HeroComponent({ data }) {
  const dataSlideList = data
    .slice(1)
    .map((item, index) => (
      <li
        data-target="#carouselExampleIndicators"
        data-slide-to={`${index + 1}`}
        key={index}
      ></li>
    ));

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
      data-interval="3000"
    >
      {/* Carousel Inner */}

      <div className="carousel-inner">
        <div className="carousel-item active">
          <Link to={`/single-room/${data[0].room_slug}`}>
            <img
              className="d-block w-100 hero hero-image"
              src={data[0].cover_image}
              alt="First slide"
            />
          </Link>
          <div className="carousel-caption d-md-block">
            <Link
              to={`/single-room/${data[0].room_slug}`}
              className="text-decoration-none text-white"
            >
              <h5>{data[0].title}</h5>
            </Link>
            <p>$ {data[0].price_per_night}</p>
          </div>
        </div>

        <CarouselItems data={data.slice(1)} />
      </div>

      {/* Carousel Inner */}

      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          className="active"
        ></li>
        {dataSlideList}
      </ol>

      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}
