import axios from "../api";
import {
  ADD_CLUB,
  GET_CLUB,
  DELETE_CLUB,
  CLUB_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS,
  EDIT_CLUB,
  GET_ALL_CLUB,
  IS_MODIFIED_CLUB
  // SEARCH_EVENT,
} from "./types";

export const addClub = (eventData) => dispatch => {
  dispatch(clearErrors());
  axios.post("/club/add", eventData)
    .then(res =>
        dispatch({
        type: ADD_CLUB,
        payload: res.data
      })
    )
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: error.response.data,
            visible: true
          }
        })
      }
    })
};




export const getAllClub = () => dispatch => {
  dispatch(setClubLoading());
  axios
    .get("/club")
    .then(res => {
      dispatch({
        type: GET_ALL_CLUB,
        payload: res.data
      });
    })
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: error.response.data,
            visible: true
          }
        })
      }
    })
};

export const getClub = id => dispatch => {
  dispatch(setClubLoading());
  axios
    .get(`/club/id/${id}`)
    .then(res =>
      dispatch({
        type: GET_CLUB,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};



export const deleteClub = id => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/club/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_CLUB,
        payload: id
      })
    )
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: error.response.data,
            visible: true
          }
        })
      }
    })
};

export const editClub = (eventData,id) => dispatch => {
  dispatch(clearErrors());
  axios.put(`/club/update/${id}`, eventData)
    .then(res =>
      dispatch({
        type: EDIT_CLUB,
        payload: res.data
      })
    )
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: error.response.data,
            visible: true
          }
        })
      }
    })
};

export const setIsModifiedClubLoading = () => {
  return {
    type: IS_MODIFIED_CLUB
  };
};

// Set loading state
export const setClubLoading = () => {
  return {
    type: CLUB_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
