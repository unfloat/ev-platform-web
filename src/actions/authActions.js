import axios from "../api";
const jwt = require('jwt-simple');

import { REGISTER_USER, SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS } from './types';
// Register User
export const registerUser = userData => dispatch => {
  axios
    .post('/auth/register', userData)
    .then(res => {
      const { token, user } = res.data;
      console.log('AAAAAAAAAAAAAAAAA', user);
      localStorage.setItem('token', token);
      // const decoded = jwt.decode(token);
      dispatch(clearErrors());
      dispatch(setCurrentUser(user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {
          message: err.response.data,
          visible: true,
          success: false
        }
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post('/auth/login', userData)
    .then(res => {
      const { token, user } = res.data;
      console.log('user', user);
      localStorage.setItem('token', token);
      // const decoded = jwt.decode(token);
      dispatch(clearErrors());
      dispatch(setCurrentUser(user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {
          message: err.message,
          visible: true
        }
      })
    );
};


// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  dispatch(setCurrentUser({}));
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
