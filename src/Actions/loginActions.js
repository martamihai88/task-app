import * as types from './types'     

export const userSignUp = (value) => {
  return {
    type: types.USER_SIGNUP,
    payload: value
  }
}

export const clearUserFieldError = () => {
  return {
    type: types.USER_SIGNUP_CLEAR_ERROR,
  }
}

export const handleUserData = (value) => {
  return {
    type: types.USER_SIGNUP_DATA,
    payload: value
  }
}

export const singedUpSUCCESSsful = () => {
  return {
    type: types.USER_SIGNUP_SUCCESS_LOGIN,
  }
}

export const userLogin = (value) => {
  return {
    type: types.USER_LOGIN,
    payload: value
  }
}
export const userLogout = (value) => {
  return {
    type: types.USER_LOGOUT,
    payload: value
  }
}