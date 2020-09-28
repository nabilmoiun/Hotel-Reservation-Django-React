import React, { useContext } from "react";
import { MyContext } from "../Context";
import Title from "../components/Title";
import BannerComponent from "../components/BannerComponent";

export default function SingleRommPage({ match }) {
  const context = useContext(MyContext);
  const room = context.rooms.find(
    (room) => room.room_slug === match.params["room_slug"]
  );
  if (!room) {
    return <div>Eroror</div>;
  } else {
    return (
      <>
        <BannerComponent room={room} />
        <div className="container my-5 align-items-center justify-content">
          <Title title="Description" />

          <div className="row">
            <div className="col-md-6 m-auto">
              <h6>Details</h6>
              <p className="text-justify" style={{ width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="col-md-6 m-auto">
              <h6>Information</h6>
              <p>Price ${room.price_per_night}</p>
              <p>Size {room.room_size} Sqr Feet</p>
              <p>Capacity Maxium {room.capacity} People</p>
              <p>Meals Included</p>
            </div>
          </div>

          <Title title="Facilities" />

          <div className="row mt-5">
            <div className="col-md-4">
              <p>
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
              <p>
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
              <p>
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
            <div className="col-md-4">
              <p>
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
              <p>
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
              <p>
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
            <div className="col-md-4">
              <p>
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
              <p>
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
              <p>
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
