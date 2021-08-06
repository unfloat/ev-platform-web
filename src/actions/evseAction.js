import axios from '../api';
import { GET_EVSES, CLEAR_ERRORS, GET_ERRORS, EVSE_LOADING } from './types';

export const getEvses = () => dispatch => {
  dispatch(setStationLoading());
  axios
    .get('/stations/')
    .then(res => {
      console.log(res);
      console.log(res.data);

      dispatch({
        type: GET_EVSES,
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

// Set loading state
export const setEvseLoading = () => {
  return {
    type: EVSE_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
