import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Auth from 'views/Auth'
import Main from 'views/Main'

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Main} />
          <Route path='/auth' component={Auth} />
        </div>
      </Router>
    )
  }
}

export default App
