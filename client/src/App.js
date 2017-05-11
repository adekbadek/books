import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Main from 'views/Main'

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Main} />
        </div>
      </Router>
    )
  }
}

export default App
