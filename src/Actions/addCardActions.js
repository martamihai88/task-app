import { ADD_CARD, INPUT_TITLE, INPUT_CONTENT, INPUT_DATE, ADD_APP_BAR_VALUE, RESET_ADD_CARD } from './types';

export const addCardRedux = ({id, type}) => dispatch => {
  dispatch({
    type: ADD_CARD,
    payload: {id, type}
  })
}

export const handleTitleRedux = e => dispatch => {
  dispatch({
    type: INPUT_TITLE,
    payload: e.title
  })
}

export const handleContentRedux = e => dispatch => {

  dispatch({
    type: INPUT_CONTENT,
    payload: e.content
  })
}

export const setDueDateRedux = date => dispatch => {
  dispatch({
    type: INPUT_DATE,
    payload: date
  })
}

export const handleAddBarChangeRedux = value => dispatch => {
  dispatch({
    type: ADD_APP_BAR_VALUE,
    payload: value
  })
}

export const resetAddCardRedux = () => dispatch => {
  dispatch({
    type: RESET_ADD_CARD
  })
}


