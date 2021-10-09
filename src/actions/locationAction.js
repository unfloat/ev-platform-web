import axios from '../api';
import {
  GET_LOCATIONS,
  CLEAR_ERRORS,
  GET_ERRORS,
  LOCATION_LOADING,
  CREATE_LOCATION,
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
export const addLocation = locationData => dispatch => {
  dispatch(setLocationLoading());
  axios
    .post('/locations/createCpoOwnedLocation', locationData)
    .then(res => {
      return res.data;
      // dispatch({
      //   type: CREATE_LOCATION,
      //   payload: res.data,
      // });
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

export const getCPOLocations = id => dispatch => {
  dispatch(setLocationLoading());
  // user cpo id param
  axios
    .get('/locations/cpo/', {
      params: {
        userId: id,
      },
    })
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
