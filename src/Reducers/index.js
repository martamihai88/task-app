import { combineReducers } from 'redux';
import appReducer from './appReducer';
import appSideReducer from './appSideReducer';
import loginReducer from './loginReducer';


export default combineReducers({
  app: appReducer,
  appSide: appSideReducer,
  login: loginReducer
})