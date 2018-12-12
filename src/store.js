import { createStore , applyMiddleware, compose } from 'redux'
import rootReducer from './Reducers/index'
/* import thunk from 'redux-thunk';
import throttle from 'lodash/throttle'
import { loadState, saveState } from './localStorage'; */
import { customMiddleWare } from './Middleware/custom';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Sagas/rootSaga';
/* 
const persistedState = loadState(); */
const middleware= [customMiddleWare];

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(...middleware, sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

sagaMiddleware.run(rootSaga)

/* store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000)); */


export default store

