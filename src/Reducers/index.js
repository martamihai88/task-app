import { combineReducers } from 'redux';
import appReducer from './appReducer'
import appSideReducer from './appSideReducer'


export default combineReducers({
  app: appReducer,
  appSide: appSideReducer
})