import { combineReducers } from "redux";
import { sessionReducer } from "./sessionReducers";

const reducers = combineReducers({
  session: sessionReducer,
});
export default reducers;
