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

import { getAuthViewURL, getRootViewURL } from 'utils/api.js'
import store from 'store'

import './styles/index.sass'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div className='mw7 m-auto'>
          <FlashMessage />
          <Loader />
          <Router>
            <HistoryObserver>
              <Route exact path={getRootViewURL()} component={Main} />
              <Route path={getAuthViewURL()} component={Auth} />
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
