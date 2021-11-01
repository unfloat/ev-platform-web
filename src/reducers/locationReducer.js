import {
  GET_LOCATIONS,
  LOCATION_LOADING,
  CREATE_LOCATION,
} from '../actions/types';

const initialState = {
  locations: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOCATION_LOADING:
      return {
        ...state,
        locations: [],
        loading: true,
      };
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
        loading: false,
      };
    case CREATE_LOCATION:
      return {
        ...state,
        locations: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
