import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../JS/actions/userAction";
import Loader from "./Loader";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, loginError, isAuth } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    document.title = `Login | Trackify`;
  }, []);

  //To redirect the user if he is already logged in
  useEffect(() => {
    isAuth && window.location.assign("/boards");
  }, [isAuth]);

  useEffect(() => {
    if (loginError) {
      alert(loginError.msg);
    }
  }, [loginError]);

  const login = (e) => {
    const cred = { email, password };
    e.preventDefault();
    dispatch(userLogin(cred));
    setEmail("");
    setPassword("");
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={login}
          >
            Sign in
          </button>
          <p className="forgot-password text-right">Forgot password?</p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
