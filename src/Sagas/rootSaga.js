import { all } from 'redux-saga/effects'
import { actionWatcherSignup, actionWatcherLogin,  } from './userSagas';
import { actionWatcherFetchCards, actionWatcherAddCard, actionWatcherRemoveCard, actionWatcherEditCard, actionWatcherArchiveCard, actionWatcherFetchArchivedCards } from './cardsSaga';

export default function* rootSaga() {
  yield all([actionWatcherSignup(),actionWatcherLogin(), actionWatcherFetchCards(), actionWatcherAddCard(), actionWatcherRemoveCard(), actionWatcherEditCard(), actionWatcherArchiveCard(), actionWatcherFetchArchivedCards()]);
}