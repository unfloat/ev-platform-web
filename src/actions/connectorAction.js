import axios from '../api';
import {
  GET_CONNECTORS,
  CLEAR_ERRORS,
  GET_ERRORS,
  CONNECTOR_LOADING,
} from './types';

export const getConnectors = () => dispatch => {
  dispatch(setConnectorLoading());
  axios
    .get('/connectors')
    .then(res => {
      dispatch({
        type: GET_CONNECTORS,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: error.response.data,
            visible: true,
          },
        });
      }
    });
};

// Set station loading

export const setConnectorLoading = () => {
  return {
    type: CONNECTOR_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
