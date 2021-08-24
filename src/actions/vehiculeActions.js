import axios from '../api';
import {
  GET_VEHICULES,
  CLEAR_ERRORS,
  GET_ERRORS,
  VEHICULE_LOADING,
} from './types';

export const getVehicules = () => dispatch => {
  dispatch(setVehiculeLoading());
  axios
    .get('/vehicules')
    .then(res => {
      dispatch({
        type: GET_VEHICULES,
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

export const addVehicule = () => dispatch => {
  dispatch(setVehiculeLoading());
  axios
    .get('/vehicules')
    .then(res => {
      dispatch({
        type: GET_VEHICULES,
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
addVehicule;
export const setVehiculeLoading = () => {
  return {
    type: VEHICULE_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
