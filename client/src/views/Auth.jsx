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

  const handleSubmit = url => (fields: AuthFormFields) => {
    authFetch(url, fields)
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
    return (
      <LoginForm
        handleSubmit={handleSubmit(getAuthenticateURL())}
        handleSignUp={handleSubmit(getSignupURL())}
      />
    )
  }
}

export default Auth
