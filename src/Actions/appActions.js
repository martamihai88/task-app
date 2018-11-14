import * as types from './types'     

export const addCardToCards = (value) => {
  return {
    type: types.ADD_CARD_TO_CARDS,
    payload: value
  }
}

export const addCardRedux = ({id, type}) => {
  return {
    type: types.ADD_CARD,
    payload: {id, type}
  }
}

export const  openEditCardRedux = (open, id) => {
  return {
    type: types.EDIT_CARD_OPEN,
    payload: {open, id}
  }
}

export const editCard = (id) => {
  return {
    type: types.EDIT_CARD,
    payload: id
  }
}

export const submitCardRedux = (cards) => {
  return {
    type: types.EDIT_CARD_SUBMIT,
    payload: cards
  }
}

export const handleTitleRedux = e => {
  return {
    type: types.INPUT_TITLE,
    payload: e.title
  }
}

export const handleContentRedux = e => {

  return {
    type: types.INPUT_CONTENT,
    payload: e.content
  }
}

export const setDueDateRedux = date => {
  return {
    type: types.INPUT_DATE,
    payload: date
  }
}

export const resetAddCardRedux = () => {
  return {
    type: types.RESET_ADD_CARD
  }
}

export const removeCardRedux = id => {
  return {
    type: types.REMOVE_CARD,
    payload: id
  }
}

export const refreshCards = (cards) => {
  return {
    type: types.REFRESH_CARDS,
    payload: cards
  }
}

export const archiveCard = (card) => {
  return {
    type: types.ARCHIVE_CARD,
    payload: card
  }
}




