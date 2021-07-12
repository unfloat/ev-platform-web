import {
    GET_EVSES,
    EVSE_LOADING
    } from "../actions/types";
    
    const initialState = {
      stations: [],
      loading: false,
    };
    
    export default function(state = initialState, action) {
      switch (action.type) {
        case EVSE_LOADING:
          return {
            ...state,
            loading: true
          };
        case GET_EVSES:
          return {
            ...state,
            stations: action.payload,
            loading: false
          };
        default:
          return state;
      }
    }   