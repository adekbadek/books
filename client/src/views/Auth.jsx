// @flow

import type { AuthFormFields, FlashMessage, User } from 'utils/types'

import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import LoginForm from 'components/LoginForm'
import {
  saveCredentials,
  readCredentials,
  getAuthenticateURL,
  getSignupURL,
  authFetch,
  serializeMessage
} from 'utils/api'
import actions from 'store/actions'

const { setFlashMessage, setUserData } = actions

@connect(null, {setFlashMessage, setUserData})
export default class Auth extends React.Component {
  props: {
    setUserData: User => void,
    setFlashMessage: FlashMessage => void,
  }
  state: {
    authenticated: boolean,
  } = {
    authenticated: !!readCredentials(),
  }
  authenticate = (token: string) => {
    saveCredentials(token)
    this.setState({authenticated: true})
  }
  handleSignUp = (fields: AuthFormFields) => {
    authFetch(getSignupURL(), fields)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.props.setFlashMessage({
            text: serializeMessage(res.error),
            modifier: 'error',
          })
        } else if (!res.error && res.auth_token) {
          this.authenticate(res.auth_token)
        }
      })
  }
  handleSubmit = (e: SyntheticEvent, fields: AuthFormFields) => {
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
        if (res && res.auth_token && res.user) {
          this.props.setUserData({...res.user})
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
