import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'

import FlashMessage from 'components/FlashMessage'
import HistoryObserver from 'components/HistoryObserver'
import Loader from 'components/Loader'

import Auth from 'views/Auth'
import Main from 'views/Main'
import UserSettings from 'views/UserSettings'

import { getAuthViewURL, getRootViewURL, getUserSettingsViewURL } from 'utils/api.js'
import store from 'store'

import 'react-datepicker/dist/react-datepicker.css'
import 'tachyons/css/tachyons.min.css'
import 'styles/index.css'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div className='mw7 m-auto'>
          <FlashMessage />
          <Loader />
          <Router>
            <HistoryObserver>
              <div className='pa4'>
                <Route exact path={getRootViewURL()} component={Main} />
                <Route path={getAuthViewURL()} component={Auth} />
                <Route path={getUserSettingsViewURL()} component={UserSettings} />
              </div>
            </HistoryObserver>
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
