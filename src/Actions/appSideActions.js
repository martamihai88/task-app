import * as types from './types'

export const openAddCardRedux = (value) => {
  return {
    type: types.OPEN_ADD_CARD,
    payload: value
  }
}

export const closeAddCardRedux = (value)  => {
 return {
    type: types.CLOSE_ADD_CARD,
    payload: value
  }
}

export const handleAddBarChangeRedux = value => {
  return{
    type: types.ADD_APP_BAR_VALUE,
    payload: value
  }
}

export const handleOpenPopperRedux = value => {
  return{
    type: types.TOGGLE_CARD_POPPER,
    payload: value
  }
}

export const clickAwayPopperRedux = value => {
  return{
    type: types.CLICK_AWAY_CARD_POPPER,
    payload: value
  }
}

export const handleDrawer = value => {
  return{
    type: types.TOGGLE_DRAWER,
    payload: value
  }
}