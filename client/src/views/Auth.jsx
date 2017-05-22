import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import LoginForm from 'components/LoginForm'
import { saveCredentials, readCredentials, getAuthenticateURL, getSignupURL } from 'utils/api'
import { setFlashMessage } from 'store/actions'

const authFetch = (url, fields) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fields)
  })
}

class Auth extends React.Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.state = {
      authenticated: !!readCredentials(),
    }
  }
  authenticate (token) {
    saveCredentials(token)
    this.setState({authenticated: true})
  }
  handleSignUp (fields) {
    authFetch(getSignupURL(), fields)
      .then(res => res.json())
      .then(res => {
        // TODO: other errors?
        if (res.error && res.error.email) {
          this.props.setFlashMessage({
            text: `${res.email} ${res.error.email}`,
            modifier: 'error',
          })
        } else if (!res.error && res.auth_token) {
          this.authenticate(res.auth_token)
        }
      })
  }
  handleSubmit (e, fields) {
    e.preventDefault()

    authFetch(getAuthenticateURL(), fields)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          this.props.setFlashMessage({
            text: 'this email/password combination won\'t work',
            modifier: 'error',
          })
        }
      })
      .then(res => {
        if (res && res.auth_token) {
          this.authenticate(res.auth_token)
        }
      })
  }
  render () {
    if (this.state.authenticated) {
      return <Redirect to='/' />
    } else {
      return <LoginForm handleSubmit={this.handleSubmit} handleSignUp={this.handleSignUp} />
    }
  }
}

export default connect(
  null,
  {setFlashMessage}
)(Auth)
