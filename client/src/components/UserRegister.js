import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRegister } from "../JS/actions/userAction";
import Loader from "./Loader";

const UserRegister = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, registerRequest, registerSuccess, msg, registerError } =
    useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Register | Trackify";
  }, []);

  useEffect(() => {
    if (!registerRequest && registerSuccess) {
      alert(msg);
    } else if (!registerRequest && !registerSuccess) {
      alert(registerError);
    }
  }, [registerRequest, registerSuccess, registerError, msg]);

  const register = (e) => {
    const newUser = { username, email, password };
    e.preventDefault();
    dispatch(userRegister(newUser));
    setUserName("");
    setEmail("");
    setPassword("");
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Sign Up</h3>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="userName"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={register}
          >
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered <Link to="/">sign in? </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
