import { put, call, takeLatest } from 'redux-saga/effects'
import * as types from '../Actions/types';
import axios from 'axios';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

const signupApi = (userData) => { 
  return axios.request({
    url: 'http://localhost:4000/user/signup',
    method: 'post',
    data: userData
  })
}

function* signUpFunction(action) {
  try {
    let { data } = yield call(signupApi, action.payload);
  yield put({type: types.USER_SIGNUP_SUCCESS,  payload: data.message});
  yield delay(3000);
  yield put({type: types.USER_SIGNUP_SUCCESS_LOGIN});
}
  catch (e) {
    yield put({type: types.USER_SIGNUP_FAILED, payload: JSON.stringify(e.response.data.message)});
  }
}

export function* actionWatcherSignup() {
  yield takeLatest(types.USER_SIGNUP, signUpFunction)
}


const loginApi = (userData) => { 
  return axios.request({
    url: 'http://localhost:4000/user/login',
    method: 'post',
    data: userData
  })
}

function* loginFunction(action) {
  try {
    let { data } = yield call(loginApi, action.payload);
    console.log(data);
    yield put({type: types.USER_LOGIN_SUCCESS,  payload: data});
}
  catch (e) {
    console.log(e);
    yield put({type: types.USER_LOGIN_FAILED, payload: JSON.stringify(e.response.data.message)});
  }
}



export function* actionWatcherLogin() {
  yield takeLatest(types.USER_LOGIN, loginFunction);
}