import React, { useContext } from "react";
import { MyContext } from "../Context";
import { Link } from "react-router-dom";
export default function LoginPage() {
  const context = useContext(MyContext);
  return (
    <div>
      <Link
        to={`/login`}
        className="btn btn-primary"
        role="button"
        onClick={context.login}
      >
        Login
      </Link>
    </div>
  );
}
