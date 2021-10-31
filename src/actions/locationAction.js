import axios from '../api';
import {
  GET_LOCATIONS,
  CLEAR_ERRORS,
  GET_ERRORS,
  LOCATION_LOADING,
  CREATE_LOCATION,
} from './types';

/*
, {
      params: {
        latitude: userLatitude,
        longitude: userLongitude,
      },
    } 
    */

export const getLocations = () => dispatch => {
  dispatch(setLocationLoading());
  axios
    .get('/locations/', {
      params: {
        latitude: '49.2603667',
        longitude: '3.0872607',
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

/*
{
        params: {
          latitude: userLatitude,
          longitude: userLongitude,
        },
      }
      */
export const getLocationsByUserGeolocation = parameters => dispatch => {
  dispatch(setLocationLoading());
  axios
    .get('/locations/geolocation', {
      params: {
        latitude: parameters.latitude,
        longitude: parameters.longitude,
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
export const getLocationsByConnectorType = connectiontypeid => dispatch => {
  dispatch(setLocationLoading());
  axios
    .get('/locations/connectiontypeid', {
      params: {
        connectiontypeid,
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
export const addLocation = locationData => dispatch => {
  dispatch(setLocationLoading());
  axios
    .post('/locations/createCpoOwnedLocation', locationData)
    .then(res => {
      dispatch(getCPOLocations(res.data.owner._id));
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

export const updateCPOLocation = (locationData, id) => dispatch => {
  dispatch(setLocationLoading());
  axios
    .put('/locations/cpo/update', locationData, {
      params: {
        locationId: id,
      },
    })
    .then(res => {
      dispatch(getCPOLocations(res.data.owner));
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

export const deleteLocation = (id, owner) => dispatch => {
  dispatch(setLocationLoading());
  axios
    .delete('/locations/cpo/delete', {
      params: {
        locationId: id,
        userId: owner,
      },
    })
    .then(res => {
      dispatch(getCPOLocations(res.data));
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

// .then(res => {
//   dispatch(getCPOLocations(res.data.owner));
// })

/*
, {
      params: {
        userId: id,
      },
    }
    */
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
