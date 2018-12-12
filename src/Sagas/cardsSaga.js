import {  put, call, select, takeLatest } from 'redux-saga/effects'
import * as types from '../Actions/types';
import axios from 'axios';  

// fetch all cards
const cardsApi = (token) => { 
  return axios.request({
    url: 'http://localhost:4000/cards',
    method: 'get',
    headers: {
      authorization: 'Bearer ' + token
    }
  })
}

function* fetchAllCards() {
  const getToken = state => state.login.user.token;
  const token = yield select(getToken);

  try {
    let { data } = yield call(cardsApi, token);
    console.log(data.cards);
    yield put({type: types.FETCH_CARDS_SUCCESS, payload: data.cards});
}
  catch (e) {
    console.log(e.response.data.message);
  }
}

export function* actionWatcherFetchCards() {
  yield takeLatest(types.FETCH_CARDS, fetchAllCards);
}

// add new card
const addCardApi = (token, card) => { 
  return axios.request({
    url: 'http://localhost:4000/cards/',
    method: 'post',
    headers: {
      'content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
    data: card
  })
}

function* addCard(action) {
  const getToken = state => state.login.user.token;
  const token = yield select(getToken);
  try {
    let { data } = yield call(addCardApi, token, action.payload);
    console.log(data.createdCard);
    yield put({type: types.ADD_CARD_TO_CARDS_SUCCESS, payload: data.createdCard});
}
  catch (e) {
    console.log(e.response.data.message);
  }
}

export function* actionWatcherAddCard() {
  yield takeLatest(types.ADD_CARD_TO_CARDS, addCard);
}

// delete card
const removeCardApi = (token, id) => { 
  return axios.request({
    url: 'http://localhost:4000/cards/' + id,
    method: 'delete',
    headers: {
      'content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
  })
}

function* getRemainingCards (action) {

  const cards = state => state.app
  const allCards= yield select(cards);
  /* console.log(xx.cards, xx.archive);
  const allCards = state => state.app.cards;
  const allArchive = state => state.app.archive;
  const cards = yield select(allCards);
  const archive = yield select(allArchive); */
  const allRemainingCards = [allCards.cards.filter((card) => card.id !== action.payload), allCards.archive.filter((archive) => archive.id !== action.payload)]
  return allRemainingCards;
}

function* removeCards(action) {
  const remainingCards = yield call(getRemainingCards, action);
  const getToken = state => state.login.user.token;
  const token = yield select(getToken);

  try {
    yield call(removeCardApi, token, action.payload);
    yield put({type: types.DELETE_CARD_SUCCESS, payload: remainingCards});
}
  catch (e) {
    console.log(e.response.data.message);
  }
}

export function* actionWatcherRemoveCard() {
  yield takeLatest(types.DELETE_CARD, removeCards);
}

// edit card
const editCardApi = (token, card) => { 
  return axios.request({
    url: 'http://localhost:4000/cards/' + card.id,
    method: 'put',
    headers: {
      'content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
    data: card
  })
}

function* editCard(action) {
  const getToken = state => state.login.user.token;
  const token = yield select(getToken);

  try {
    let { data } = yield call(editCardApi, token, action.payload.card);
    console.log(data)
     yield put({type: types.EDIT_CARD_SUBMIT_SUCCESS, payload: action.payload.editedCards});
} 
  catch (e) {
    console.log(e.response.data.message);
  }
}

export function* actionWatcherEditCard() {
  yield takeLatest(types.EDIT_CARD_SUBMIT, editCard);
}

// archive card
const archiveCardApi = (token, id) => { 
  return axios.request({
    url: 'http://localhost:4000/archive/' + id,
    method: 'patch',
    headers: {
      'content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
    data: { archived: true }
  })
}

function* archiveCard(action) {
  const getToken = state => state.login.user.token;
  const token = yield select(getToken);

  try {
    let { data } = yield call(archiveCardApi, token, action.payload.id);
    console.log(data);
     yield put({type: types.ARCHIVE_CARD_SUBMIT_SUCCESS, payload: { cards: action.payload.cards, archive: action.payload.archive}});
} 
  catch (e) {
    console.log(e.response.data.message);
  }
}

export function* actionWatcherArchiveCard() {
  yield takeLatest(types.ARCHIVE_CARD_SUBMIT, archiveCard);
}

// fetch all archived cards
const archivedCardsApi = (token) => { 
  return axios.request({
    url: 'http://localhost:4000/archive',
    method: 'get',
    headers: {
      authorization: 'Bearer ' + token
    }
  })
}

function* fetchArchivedCards() {
  const getToken = state => state.login.user.token;
  const token = yield select(getToken);

  try {
    let { data } = yield call(archivedCardsApi, token);
    console.log(data.cards);
    yield put({type: types.FETCH_ARCHIVED_CARDS_SUCCESS, payload: data.cards});
}
  catch (e) {
    console.log(e.response.data.message);
  }
}

export function* actionWatcherFetchArchivedCards() {
  yield takeLatest(types.FETCH_ARCHIVED_CARDS, fetchArchivedCards);
}