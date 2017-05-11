import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import LoginForm from 'components/LoginForm'
import { saveCredentials, readCredentials } from 'utils/api'

class Auth extends React.Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      authenticated: !!readCredentials(),
    }
  }
  handleSubmit (e) {
    e.preventDefault()

    fetch('/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: e.target.querySelector('#email-address').value,
        password: e.target.querySelector('#password').value,
      })
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          this.props.setFlashMessage('this email/password combination won\'t work')
        }
      })
      .then(res => {
        if (res && res.auth_token) {
          saveCredentials(res.auth_token)
          this.setState({authenticated: true})
        }
      })
  }
  render () {
    if (this.state.authenticated) {
      return <Redirect to='/' />
    } else {
      return <LoginForm handleSubmit={this.handleSubmit} />
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFlashMessage: message => {
      dispatch({type: 'SET_FLASH_MESSAGE', message})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Auth)
