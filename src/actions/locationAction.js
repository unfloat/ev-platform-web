import axios from '../api';
import {
  GET_LOCATIONS,
  CLEAR_ERRORS,
  GET_ERRORS,
  LOCATION_LOADING,
} from './types';

// export const getLocations =  () => async dispatch => {
//   // dispatch(setStationLoading());
//   try {
//     const locations = await axios.get("/locations/all")
//     dispatch({
//       type: GET_LOCATIONS,
//       payload: locations.data
//     });

//   } catch (error) {
//     if (error.response && error.response.data) {
//       dispatch({
//         type: GET_ERRORS,
//         payload: {
//           message: error.response.data,
//           visible: true
//         }
//       })
//     }
//   }

// };

// Set loading state

export const getLocations = () => dispatch => {
  dispatch(setStationLoading());
  axios
    .get('/locations')
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
export const setStationLoading = () => {
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
