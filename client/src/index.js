// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import FlashMessage from 'components/FlashMessage'
import Loader from 'components/Loader'
import history from 'utils/history'

import {
  AsyncMain,
  AsyncAuth,
  AsyncUserSettings
} from 'components/AsyncLoaded'

import { getAuthViewURL, getRootViewURL, getUserSettingsViewURL } from 'utils/api.js'
import store from 'store'

import 'tachyons/css/tachyons.min.css'
import 'styles/index.css'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div className='mw7 m-auto'>
          <FlashMessage />
          <Loader />
          <Router history={history}>
            <div className='pa4'>
              <Route exact path={getRootViewURL()} component={AsyncMain} />
              <Route path={getAuthViewURL()} component={AsyncAuth} />
              <Route path={getUserSettingsViewURL()} component={AsyncUserSettings} />
            </div>
          </Router>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
