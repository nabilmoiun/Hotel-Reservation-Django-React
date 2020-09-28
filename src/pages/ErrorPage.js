import React from "react";
import {Link} from 'react-router-dom';

export default function ErrorPage() {
  return (
    <>
      <div className="my-5">
        <h4 className="text-danger m-auto text-center ">404 Page Not Found</h4>
      </div>
      <div className="m-auto text-center">
        <Link to="/rooms" className="btn btn-primary" role="button">
          Goto Rooms
        </Link>
      </div>
    </>
  );
}
