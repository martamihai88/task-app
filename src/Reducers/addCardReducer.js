import { ADD_CARD, INPUT_TITLE, INPUT_CONTENT, INPUT_DATE, ADD_APP_BAR_VALUE, RESET_ADD_CARD  } from '../Actions/types';

const initialState = {
  card:{
    id: null,
    title: '',
    content: '',
    dueDays:0,
    createDate: '',
    dueDate: '',
    progress: 0
    },
  appBarValue:0
  };

export default function(state = initialState, { type, payload}){
  switch (type){
    case RESET_ADD_CARD:
    console.log(state);
      return {
        ...state, card: {...initialState.card}
      }
    case ADD_CARD:
      return {
        ...state , card: {...state.card, id: payload.id, type: payload.type, progress: 0,}
      }
    case INPUT_TITLE: 
      return {
        ...state , card: {...state.card, title: payload}
      } 
    case INPUT_CONTENT: 
      return {
          ...state , card: {...state.card, content: payload}
      }
    case INPUT_DATE: 
      return {
        ...state, 
        card: { 
          ...state.card,
          dueDays: payload.dueDays,
          createDate: payload.createDate ,
          dueDate: payload.dueDate
        }
      } 
    case ADD_APP_BAR_VALUE: 
      return {
        ...state,
        appBarValue: payload.value,
      } 
    default: {
        return state
    }
  }
}