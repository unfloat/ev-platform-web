
import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import locationReducer from './locationReducer';
import evseReducer from './evseReducer';


export default combineReducers({
  errors: errorReducer,
  evse: evseReducer,
  location: locationReducer,
});