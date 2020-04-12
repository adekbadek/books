// @flow

import { createStore, applyMiddleware } from 'redux'
import persistState from 'redux-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import reducerApp from 'store/reducers'
import rootSaga from 'utils/sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export default createStore(
  reducerApp,
  composeWithDevTools(persistState('books'), applyMiddleware(sagaMiddleware))
)

// run the saga
sagaMiddleware.run(rootSaga)
