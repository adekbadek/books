import React from 'react'
import LoginForm from 'components/LoginForm'

class Auth extends React.Component {
  handleSubmit (e) {
    e.preventDefault()
  }
  render () {
      return <LoginForm handleSubmit={this.handleSubmit} />
  }
}

export default Auth
