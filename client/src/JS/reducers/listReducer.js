import {
  POST_LIST_FAILED,
  POST_LIST_SUCCESS,
  POST_LIST_REQUEST,
  GET_LISTS_REQUEST,
  GET_LISTS_SUCCESS,
  GET_LISTS_FAILED,
  EDIT_LIST_REQUEST,
  EDIT_LIST_SUCCESS,
  EDIT_LIST_FAILED,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAILED,
} from "../constants/actionsTypes";

const initialState = {
  listLoading: false,
  lists: [],
};

const listReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_LIST_REQUEST:
    case GET_LISTS_REQUEST:
    case POST_LIST_REQUEST:
    case EDIT_LIST_REQUEST:
      return { ...state, listLoading: true };

    case GET_LISTS_SUCCESS:
      return { ...state, listLoading: false, lists: payload };

    case POST_LIST_SUCCESS:
      return { ...state, listLoading: false, lists: [...state.lists, payload] };

    case EDIT_LIST_SUCCESS: {
      const listsCopy = [...state.lists];
      const targetIndex = listsCopy.findIndex(
        (list) => list._id === payload.list._id
      );
      listsCopy[targetIndex] = payload.list;
      return { ...state, lists: listsCopy, listLoading: false };
    }

    case DELETE_LIST_SUCCESS:
      const prevLists = [...state.lists];
      const index = prevLists.findIndex(
        (list) => list._id === payload.list._id
      );
      prevLists.splice(index, 1);
      return { ...state, lists: prevLists, listLoading: false };

    case DELETE_LIST_FAILED:
    case EDIT_LIST_FAILED:
    case GET_LISTS_FAILED:
    case POST_LIST_FAILED:
      return { ...state, listLoading: false, error: payload };

    default:
      return state;
  }
};

export default listReducer;
