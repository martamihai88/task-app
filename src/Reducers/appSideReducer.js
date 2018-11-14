import * as types from '../Actions/types'

const initialState = {
  open: false,
  appBarValue: 0,
  header: {
    open: false,
    anchor: 'left',
  },
  footer: {
    anchorEl: null,
    open: false,
    placement: null,
  }
}

export default function(state = initialState, { type, payload }){
  switch (type){
    case types.OPEN_ADD_CARD:
      return {
        ...state, open: payload
      }
    case types.CLOSE_ADD_CARD:
      return {
        ...state, open: payload
      }
    default: {
      return state
    }
    case types.ADD_APP_BAR_VALUE: 
      return {
          ...state,
          appBarValue: payload.value,
      }
    case  types.TOGGLE_CARD_POPPER:
      return {
        ...state, footer: {...state.footer, ...payload }
    }
    case  types.CLICK_AWAY_CARD_POPPER:
      return {
        ...state, footer: {...state.footer, open: payload.open}
    }
    case  types.TOGGLE_DRAWER:
      return {
        ...state, header: {...state.header, open: payload.open}
    }  
  }
}