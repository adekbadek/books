import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import FlashMessage from 'components/FlashMessage'
import HistoryObserver from 'components/HistoryObserver'
import Auth from 'views/Auth'
import Main from 'views/Main'

import reducerApp from 'store/reducers'

import './styles/index.css'

let store = createStore(
  reducerApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          <FlashMessage />
          <Router>
            <HistoryObserver>
              <Route exact path='/' component={Main} />
              <Route path='/auth' component={Auth} />
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
