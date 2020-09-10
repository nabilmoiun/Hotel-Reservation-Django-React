import React from "react";

export default function BannerComponent({ room }) {
  return (
    <>
      <div
        className="jumbotron bannertext-white text-center"
        style={{
          backgroundImage: `url("${room.cover_image}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%"
        }}
      >
        <h1 className="display-4 font-weight-bold text-white">{room.title}</h1>
        {/* <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p> */}
        <hr className="my-4" />
        {/* <p>
          It uses utility classNamees for typography and spacing to space
          content out within the larger container.
        </p> */}
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#" role="button">
            Book Room
          </a>
        </p>
      </div>
    </>
  );
}
