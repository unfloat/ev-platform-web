import { GET_CONNECTORS, CONNECTOR_LOADING } from '../actions/types';

const initialState = {
  connectors: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CONNECTOR_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CONNECTORS:
      return {
        ...state,
        connectors: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
