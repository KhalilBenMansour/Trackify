import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import UserRegister from "./components/UserRegister";
import { Routes, Route } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./JS/actions/userAction";
import Boards from "./components/Boards";
import Board from "./components/Board";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  useEffect(() => {
    dispatch(getProfile());
  }, [isAuth]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/boards" element={<PrivateRoute />}>
          <Route path="" element={<Boards />} />
          <Route path="/boards/:id" element={<Board />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
