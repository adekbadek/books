// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import FlashMessage from 'components/FlashMessage'
import Loader from 'components/Loader'
import Header from 'components/Header'
import history from 'utils/history'

import {
  AsyncMain,
  AsyncBook,
  AsyncAuth,
  AsyncUserSettings
} from 'components/AsyncLoaded'

import {
  ROOT_VIEW_URL,
  BOOK_VIEW_URL,
  AUTH_VIEW_URL,
  USER_SETTINGS_VIEW_URL,
} from 'utils/api.js'
import store from 'store'

import 'tachyons/css/tachyons.min.css'
import 'styles/index.css'

const App = () => (
  <Provider store={store}>
    <div className='mw8 m-auto'>
      <FlashMessage />
      <Loader />
      <Router history={history}>
        <div className='pa4'>
          <Header />
          <Route exact path={ROOT_VIEW_URL} component={AsyncMain} />
          <Route path={BOOK_VIEW_URL} component={AsyncBook} />
          <Route path={AUTH_VIEW_URL} component={AsyncAuth} />
          <Route path={USER_SETTINGS_VIEW_URL} component={AsyncUserSettings} />
        </div>
      </Router>
    </div>
  </Provider>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
