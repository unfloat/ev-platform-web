import axios from '../api';

import { SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS } from './types';
// Register User
export const registerUser = userData => dispatch => {
  axios
    .post('/auth/register', userData)
    .then(res => {
      const { token, user } = res.data;
      localStorage.setItem('token', token.accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(clearErrors());
      dispatch(setCurrentUser(user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {
          message: err.response,
          visible: true,
          success: false,
        },
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post('/auth/login', userData)
    .then(res => {
      const { token, user } = res.data;
      localStorage.setItem('token', JSON.stringify(token.accessToken));
      localStorage.setItem('user', JSON.stringify(user));

      console.log('USER', localStorage.getItem('user'));
      dispatch(clearErrors());
      dispatch(setCurrentUser(user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {
          message: err.message,
          visible: true,
        },
      })
    );
};

export const updateProfile = userData => dispatch => {
  axios
    .patch('/users/', userData, {
      params: {
        userId: userData.id,
      },
    })
    .then(res => {
      const { token, user } = res.data;
      localStorage.setItem('token', token.accessToken);

      localStorage.setItem('user', JSON.stringify(user));
      dispatch(clearErrors());
      dispatch(setCurrentUser(user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {
          message: err.message,
          visible: true,
        },
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(setCurrentUser(null));
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
