import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import FlashMessage from 'components/FlashMessage'
import Auth from 'views/Auth'
import Main from 'views/Main'

import './styles/index.css'

class App extends React.Component {
  render () {
    return (
      <div>
        <FlashMessage />
        <Router>
          <div>
            <Route exact path='/' component={Main} />
            <Route path='/auth' component={Auth} />
          </div>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
