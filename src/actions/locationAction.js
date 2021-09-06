import axios from '../api';
import {
  GET_LOCATIONS,
  CLEAR_ERRORS,
  GET_ERRORS,
  LOCATION_LOADING,
} from './types';

export const getLocations = () => dispatch => {
  dispatch(setLocationLoading());
  axios
    .get('/locations/')
    .then(res => {
      dispatch({
        type: GET_LOCATIONS,
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

//     .get('/locations/saveLocations')

// Set station loading

export const setLocationLoading = () => {
  return {
    type: LOCATION_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
