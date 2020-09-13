import React, { useContext, useState } from "react";
import { MyContext } from "../Context";
import { Link, Redirect } from "react-router-dom";
export default function LoginPage() {
  const context = useContext(MyContext);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  if (context.isUserAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container m-auto align-items-center justify-content-center">
      <form onSubmit={(event) => context.login(event, data)}>
        <div className="row"></div>
        <div className="row">
          <div className="form-group col-md-6 m-auto">
            <h6 id="login-error-header" className="col-md-6 m-auto"></h6>
            <label htmlFor="inputUserName">Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={data.username}
              placeholder="Username"
              onChange={(event) =>
                setData({ ...data, username: event.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6 m-auto">
            <label htmlFor="inputPassword">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={data.password}
              placeholder="Password"
              onChange={(event) =>
                setData({ ...data, password: event.target.value })
              }
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 m-auto">
            <button type="submit" className="btn btn-primary px-5 my-3">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
