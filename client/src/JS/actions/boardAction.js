import axios from "axios";
import {
  EDIT_BOARD_FAILED,
  EDIT_BOARD_SUCCESS,
  EDIT_BOARD_REQUEST,
  GET_BOARDS_SUCCESS,
  GET_BOARDS_FAILED,
  GET_BOARDS_REQUEST,
  POST_BOARD_REQUEST,
  POST_BOARD_SUCCESS,
  POST_BOARD_FAILED,
  GET_BOARDBY_ID_REQUEST,
  GET_BOARDBY_ID_SUCCESS,
  GET_BOARDBY_ID_FAILED,
  GET_LISTS_REQUEST,
  GET_LISTS_SUCCESS,
  GET_LISTS_FAILED,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILED,
} from "../constants/actionsTypes";

const BASE_URL = "/api/boards";

// get all boards for user
export const fetchBoards = () => async (dispatch) => {
  dispatch({ type: GET_BOARDS_REQUEST });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}`, config);
    dispatch({ type: GET_BOARDS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_BOARDS_FAILED, payload: error.response.data });
  }
};

//create new board for user
export const postBoard = (board) => async (dispatch) => {
  dispatch({ type: POST_BOARD_REQUEST });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.post(`${BASE_URL}`, board, config);
    dispatch({ type: POST_BOARD_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: POST_BOARD_FAILED, payload: error.response.data });
  }
};

// get  board by id for user
export const fetchBoardById = (id) => async (dispatch) => {
  dispatch({ type: GET_BOARDBY_ID_REQUEST });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/${id}`, config);
    dispatch({ type: GET_BOARDBY_ID_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_BOARDBY_ID_FAILED, payload: error.response.data });
  }
};

// get lists from board for a user
export const fetchListsFromBoard = (id) => async (dispatch) => {
  dispatch({ type: GET_LISTS_REQUEST });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/${id}/lists`, config);
    dispatch({ type: GET_LISTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_LISTS_FAILED, payload: error.response.data });
  }
};

export const editBoard = (id, eBoard) => async (dispatch) => {
  dispatch({ type: EDIT_BOARD_REQUEST });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, eBoard, config);

    dispatch({ type: EDIT_BOARD_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: EDIT_BOARD_FAILED, payload: error.response.data });
  }
};

//delete  board for a user
export const removeBoard = (id) => async (dispatch) => {
  dispatch({ type: DELETE_BOARD_REQUEST });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, config);

    dispatch({ type: DELETE_BOARD_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: DELETE_BOARD_FAILED, payload: error.response.data });
  }
};
