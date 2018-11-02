import { OPEN_ADD_CARD, CLOSE_ADD_CARD } from '../Actions/types';

  export default function(state = {open: false,}, { type, payload}){
    switch (type){
      case OPEN_ADD_CARD:
        return {
          ...state, open: payload
        }
      case CLOSE_ADD_CARD:
        return {
          ...state, open: payload
        }      
      default: {
          return state
      }
    }
  }