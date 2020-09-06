import React from "react";
import { Link } from "react-router-dom";
import CarouselItems from "./CarouselItems";
export default function HeroComponent() {
  const image =
    "https://media.architecturaldigest.com/photos/560c37dd7da26e3235ad995e/2:1/w_1200,h_600,c_limit/gray-living-room-01.jpg";
  const carouselItems = [image, image, image, image];
  const dataSlideList = carouselItems.map((item, index) => (
    <li
      data-target="#carouselExampleIndicators"
      data-slide-to={`${index + 1}`}
    ></li>
  ));

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          className="active"
        ></li>
        {/* <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="4"></li> */}
        {dataSlideList}
      </ol>

      {/* Carousel Inner */}

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={image} alt="First slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>image - 0</h5>
            <p>Paragraph</p>
          </div>
        </div>

        <CarouselItems data={carouselItems} />
      </div>

      {/* Carousel Inner */}

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
