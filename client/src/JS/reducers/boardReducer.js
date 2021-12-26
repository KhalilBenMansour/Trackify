import {
  EDIT_BOARD_FAILED,
  EDIT_BOARD_SUCCESS,
  EDIT_BOARD_REQUEST,
  GET_BOARDBY_ID_FAILED,
  GET_BOARDBY_ID_REQUEST,
  GET_BOARDBY_ID_SUCCESS,
  GET_BOARDS_FAILED,
  GET_BOARDS_REQUEST,
  GET_BOARDS_SUCCESS,
  POST_BOARD_FAILED,
  POST_BOARD_REQUEST,
  POST_BOARD_SUCCESS,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILED,
} from "../constants/actionsTypes";

const initialState = {
  loading: false,
  boards: [],
  currentBoard: {},
};

const boardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EDIT_BOARD_REQUEST:
    case POST_BOARD_REQUEST:
    case GET_BOARDS_REQUEST:
    case DELETE_BOARD_REQUEST:
    case GET_BOARDBY_ID_REQUEST:
      return { ...state, loading: true };

    case GET_BOARDS_SUCCESS:
      return { ...state, loading: false, boards: payload };

    case GET_BOARDBY_ID_SUCCESS:
      return { ...state, loading: false, currentBoard: payload };
    case EDIT_BOARD_SUCCESS: {
      const boardsCopy = [...state.boards];
      const targetIndex = boardsCopy.findIndex(
        (board) => board._id === payload.board._id
      );
      boardsCopy[targetIndex] = payload.board;
      return {
        ...state,
        boards: boardsCopy,
        currBoard: payload.board,
        loading: false,
      };
    }

    case DELETE_BOARD_SUCCESS: {
      const prevBoards = [...state.boards];
      const index = prevBoards.findIndex(
        (board) => board._id === payload.board._id
      );
      prevBoards.splice(index, 1);
      return {
        ...state,
        boards: prevBoards,
        loading: false,
      };
    }

    case POST_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        boards: [...state.boards, payload],
      };

    case DELETE_BOARD_FAILED:
    case EDIT_BOARD_FAILED:
    case POST_BOARD_FAILED:
    case GET_BOARDS_FAILED:
    case GET_BOARDBY_ID_FAILED:
      return { ...state, loading: false, error: payload, boards: [] };

    default:
      return state;
  }
};

export default boardReducer;
