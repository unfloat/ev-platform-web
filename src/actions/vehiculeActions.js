import axios from '../api';
import {
  GET_VEHICULES,
  CLEAR_ERRORS,
  GET_ERRORS,
  VEHICULE_LOADING,
  CREATE_VEHICULES,
} from './types';

export const getVehicules = id => dispatch => {
  dispatch(setVehiculeLoading());
  axios
    .get('/vehicules/', {
      params: {
        userId: id,
      },
    })
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

export const addVehicule = vehiculeData => dispatch => {
  axios
    .post('/vehicules/add', vehiculeData)
    .then(res => {
      dispatch(getVehicules(res.data.id));
    })
    .then(res => {
      dispatch({
        type: GET_VEHICULES,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response && error.response.data) {
        console.log(error.response.data);
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

export const updateVehicule = (vehiculeData, id) => dispatch => {
  dispatch(setVehiculeLoading());
  axios
    .put('/vehicules/update', vehiculeData, {
      params: {
        vehiculeId: id,
      },
    })
    .then(res => {
      dispatch(getVehicules(res.data));
    })
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
export const deleteVehicule = (id, user) => dispatch => {
  //console.log('worked');
  dispatch(setVehiculeLoading());
  axios
    .delete('/vehicules/delete', {
      params: {
        vehiculeId: id,
        userId: user,
      },
    })
    .then(res => {
      dispatch(getVehicules(res.data));
    })
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
