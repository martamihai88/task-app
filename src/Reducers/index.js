import { combineReducers } from 'redux';
import removeCardReducer from './removeCardReducer';
import addCardReducer from './addCardReducer';
import appReducer from './appReducer'


export default combineReducers({
  removeCard: removeCardReducer,
  addCard: addCardReducer,
  app: appReducer
})