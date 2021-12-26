import { combineReducers } from "redux";
import userReducer from "./userReducer";
import boardReducer from "./boardReducer";
import listReducer from "./listReducer";

const rootReducer = combineReducers({
  userReducer,
  boardReducer,
  listReducer,
});
export default rootReducer;
