import axios from '../api';
import {
  GET_LOCATIONS,
  CLEAR_ERRORS,
  GET_ERRORS,
  LOCATION_LOADING,
  GET_LOCATIONS_BY_GEO,
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
        latitude: 48.856614,
        longitude: 2.3522219,
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
export const getLocationsByUserGeolocation = params => dispatch => {
  dispatch(setLocationLoading());
  axios
    .get('/locations/geolocation', {
      params,
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
