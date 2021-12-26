import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../JS/actions/userAction";

const NavBar = () => {
  const { isAuth } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  return (
    <div>
      {isAuth ? (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark py-3 fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Trackify
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navmenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navmenu">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link"
                    onClick={() => dispatch(logout())}
                  >
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark py-3 fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Trackify
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navmenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navmenu">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      <br />
    </div>
  );
};

export default NavBar;
