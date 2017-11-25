// @flow

import { createStore } from 'redux'
import persistState from 'redux-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducerApp from 'store/reducers'

export default createStore(
  reducerApp,
  composeWithDevTools(
    persistState('books'),
  )
)
