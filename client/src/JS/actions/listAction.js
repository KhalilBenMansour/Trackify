import axios from "axios";
import {
  EDIT_LIST_REQUEST,
  EDIT_LIST_SUCCESS,
  EDIT_LIST_FAILED,
  POST_LIST_FAILED,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAILED,
} from "../constants/actionsTypes";

const BASE_URL = "http://localhost:5000/api/lists";

// create new list on board
export const postList = (list) => async (dispatch) => {
  dispatch({ type: POST_LIST_REQUEST });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.post(`${BASE_URL}`, list, config);
    dispatch({ type: POST_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: POST_LIST_FAILED, payload: error.response.data });
  }
};

//update  list on board for a user
export const editList = (id, editList) => async (dispatch) => {
  dispatch({ type: EDIT_LIST_REQUEST });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, editList, config);

    dispatch({ type: EDIT_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: EDIT_LIST_FAILED, payload: error.response.data });
  }
};

//delete  list on board for a user
export const removeList = (id) => async (dispatch) => {
  dispatch({ type: DELETE_LIST_REQUEST });
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, config);

    dispatch({ type: DELETE_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: DELETE_LIST_FAILED, payload: error.response.data });
  }
};
