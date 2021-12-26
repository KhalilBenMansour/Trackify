import {
  GET_PROFILE_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGOUT,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/actionsTypes";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users/";
//User register action creator
export const userRegister = (newUser) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const res = await axios.post(`${BASE_URL}register`, newUser);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAILED, payload: error.response.data });
  }
};
//User login action creator
export const userLogin = (userCred) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const res = await axios.post(`${BASE_URL}login`, userCred);
    localStorage.setItem("token", res.data.token);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAILED, payload: error.response.data });
  }
};
//check if user is authentificated
export const getProfile = () => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}currentUser`, config);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_PROFILE_FAILED, payload: error.response.data });
  }
};
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
};
