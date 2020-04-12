// @flow

import type { AuthFormFields } from 'utils/types'

import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import LoginForm from 'components/LoginForm'
import {
  saveCredentials,
  readCredentials,
  getAuthenticateURL,
  getSignupURL,
  authFetch,
  serializeMessage,
} from 'utils/api'
import actions from 'store/actions'
import { ROOT_VIEW_URL } from 'utils/api.js'

const Auth = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const displayErrorFlashMessage = error =>
    dispatch(
      actions.setFlashMessage({
        text: serializeMessage(error),
        modifier: 'error',
      })
    )

  const handleSignUp = (fields: AuthFormFields) => {
    authFetch(getSignupURL(), fields)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          displayErrorFlashMessage(res.error)
        } else if (res.auth_token) {
          saveCredentials(res.auth_token)
        }
      })
  }

  const handleSubmit = (e: SyntheticEvent, fields: AuthFormFields) => {
    e.preventDefault()

    authFetch(getAuthenticateURL(), fields)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          displayErrorFlashMessage({
            error: ["email/password combination won't work"],
          })
        }
      })
      .then(res => {
        if (res && res.auth_token && res.user) {
          dispatch(actions.setUserData({ ...res.user }))
          saveCredentials(res.auth_token)
          history.push(ROOT_VIEW_URL)
        }
      })
  }

  if (readCredentials()) {
    return <Redirect to={ROOT_VIEW_URL} />
  } else {
    return <LoginForm handleSubmit={handleSubmit} handleSignUp={handleSignUp} />
  }
}

export default Auth
