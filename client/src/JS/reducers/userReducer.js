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

const initialState = {
  loading: false,
  registerRequest: true,
  registerSuccess: false,
  loginRequest: true,
  loginSuccess: false,
};
const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        registerSuccess: false,
        registerRequest: true,
      };
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loginSuccess: false,
        loginRequest: true,
      };
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: payload.msg,
        registerSuccess: true,
        registerRequest: false,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload.token,
        user: payload.user,
        msg: payload.msg,
        isAuth: true,
        loginSuccess: true,
        loginRequest: false,
        loginError: "",
      };
    case GET_PROFILE_SUCCESS:
      return { ...state, loading: false, user: payload, isAuth: true };

    case USER_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        registerError: payload,
        registerSuccess: false,
        registerRequest: false,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        loginError: payload,
        loginSuccess: false,
        loginRequest: false,
      };
    case GET_PROFILE_FAILED:
      return { ...state, loading: false, error: payload };
    case LOGOUT:
      return { ...state, isAuth: false, loading: false };

    default:
      return state;
  }
};
export default userReducer;
