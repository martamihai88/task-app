import { REMOVE_CARD } from '../Actions/types';

export default function(state = '', action){
  switch (action.type){
    case REMOVE_CARD:
      return {
        ...state,
        value: action.payload
      }
      default: {
        return state
      }
  }
}