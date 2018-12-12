import * as types from '../Actions/types';  

const initialState = {
  loggedIn: false,
  user: {
    email: '',
    token: ''
  },
  signUp: {
        userAlreadyExists: false, 
        message: '',
        singedUp: false,
  },
  formData: { 
    password: '', 
    email: '' 
  }
}

  export default function(state = initialState, { type, payload }){
    switch (type){
      case types.USER_SIGNUP_SUCCESS: {
        return {
          ...state, signUp: { ...state.signUp, singedUp: true }
        }
      }
      case types.USER_SIGNUP_FAILED: {
        return {
          ...state, signUp: { ...state.signUp, userAlreadyExists: true, message: payload }
        }
      }
      case types.USER_SIGNUP_SUCCESS_LOGIN: {
        return {
          ...state, signUp: { ...state.signUp, singedUp: false,  userAlreadyExists: false, }, formData: { password: '', email: '' } 
        }
      }
      case types.USER_SIGNUP_CLEAR_ERROR: {
        return {
          ...state, signUp: { ...state.signUp, userAlreadyExists: false, message: '' }
        }
      }
      case types.USER_SIGNUP_DATA: {
        return {
          ...state, formData: { password: payload.password, email: payload.email } 
        }
      }
      case types.USER_LOGIN_SUCCESS: {
        return {
          ...state, loggedIn: true, user: { email: payload.email, token: payload.token } 
        }
      }
      /* case types.USER_LOGIN_FAILED: {
        return {
          ...state,
        }
      } */
      case types.USER_LOGOUT: {

        return {
          ...state, loggedIn: false, user: { email: '', token: '' } 
        }
      }
      
      default: {
        return state
      }     
    }
  }