import  * as types from '../Actions/types';  
import { today } from '../static'

const initialState = {
  card:{
    id: "",
    title: '',
    content: '',
    dueDays: 0,
    createDate: '',
    dueDate: today._i,
    progress: 0,
    type: '',
    archived: false
    },
    editedCardId: '',
  cards: [],
  archive: [],
  openEdit: false ,
  };

  export default function(state = initialState, { type, payload}){
    switch (type){
      case types.RESET_ADD_CARD:
        return {
          ...state, card: {...initialState.card}
      }
      case types.ADD_CARD:
        return {
          ...state , card: {...state.card, id: payload.id, type: payload.type}
        }
      case types.EDIT_CARD_OPEN:
        return {
          ...state, openEdit: payload.open, editedCardId: payload.id
        }
      case types.EDIT_CARD:
        return {
          ...state , card: payload
        }  
      case types.INPUT_TITLE: 
        return {
          ...state , card: {...state.card, title: payload}
        } 
      case types.INPUT_CONTENT: 
        return {
          ...state , card: {...state.card, content: payload}
        }
      case types.INPUT_DATE: 
        return {
          ...state, 
          card: { 
            ...state.card,
            dueDays: payload.dueDays,
            dueDate: payload.dueDate
          }
        } 
      case types.ADD_CARD_TO_CARDS_SUCCESS:
        return {
          ...state , cards: [...state.cards, payload] 
        }
      case types.DELETE_CARD_SUCCESS:
        return {
        ...state,  cards: payload[0], archive: payload[1]
        }
      case types.ARCHIVE_CARD_SUBMIT_SUCCESS:
        return {
        ...state, cards: payload.cards , archive: [...state.archive, {...payload.archive, archived: true}]
        }
      case types.EDIT_CARD_SUBMIT_SUCCESS:  
      case types.REFRESH_CARDS:
      case types.FETCH_CARDS_SUCCESS:  
        return {
        ...state, cards: payload
        }
      case types.FETCH_ARCHIVED_CARDS_SUCCESS: {
        return {
          ...state, archive : payload
        }
      }      
      default: {
        return state
      }     
    }
  }