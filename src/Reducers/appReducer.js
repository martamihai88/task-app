import  * as types from '../Actions/types';  
import { today, cardFilter } from '../static'

const initialState = {
  card:{
    id: '',
    title: '',
    content: '',
    dueDays: 0,
    createDate: '',
    dueDate: today._i,
    progress: '',
    type: '',
    },
    id: '',
  cards: [],
  archive: [],
  openEdit: false 
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
          ...state , openEdit: payload.open, id: payload.id
        }
      case types.EDIT_CARD:
        return {
          ...state , card: cardFilter(state.cards, payload)[0]
        }
      case types.EDIT_CARD_SUBMIT:
        return {
          ...state, cards: payload
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
      case types.ADD_CARD_TO_CARDS:
        return {
        ...state, cards: [...state.cards, payload]
        }
      case types.REMOVE_CARD:
        return {
        ...state, cards: state.cards.filter((card) => card.id !== payload)
        }
      case types.ARCHIVE_CARD:
      console.log(state.cards.filter((card) => card.id !== payload.id))
        return {
        ...state, cards: state.cards.filter((card) => card.id !== payload.id) , archive: [...state.archive, payload ]
        }
      case types.REFRESH_CARDS:
        return {
        ...state, cards: payload
        }    
      default: {
        return state
      }     
    }
  }