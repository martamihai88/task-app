import { OPEN_ADD_CARD, CLOSE_ADD_CARD } from './types'

export const openAddCardRedux = (value) => dispatch => {
  dispatch({
    type: OPEN_ADD_CARD,
    payload: value
  })
}

export const closeAddCardRedux = (value) => dispatch => {
  dispatch({
    type: CLOSE_ADD_CARD,
    payload: value
  })
}