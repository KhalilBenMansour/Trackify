import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
