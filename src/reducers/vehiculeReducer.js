import {
  GET_VEHICULES,
  VEHICULE_LOADING,
  CREATE_VEHICULES,
} from '../actions/types';

const initialState = {
  vehicules: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VEHICULE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_VEHICULES:
      return {
        ...state,
        vehicules: action.payload,
        loading: false,
      };
    case CREATE_VEHICULES:
      return {
        ...state,
        vehicules: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
