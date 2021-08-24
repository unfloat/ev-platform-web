import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import locationReducer from './locationReducer';
import evseReducer from './evseReducer';
import authReducer from './authReducer';
import vehiculeReducer from './vehiculeReducer';
import connectorReducer from './connectorReducer';

export default combineReducers({
  errors: errorReducer,
  evse: evseReducer,
  location: locationReducer,
  auth: authReducer,
  connector: connectorReducer,
  vehicule: vehiculeReducer,
});
