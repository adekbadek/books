// @flow

import React, { useState } from 'react'

import type { AuthFormFields } from 'utils/types'
import Input from 'components/forms/Input'
import Button from 'components/Button'

const LoginForm = ({ handleSubmit, handleSignUp }) => {
  const [inputsVals: AuthFormFields, setInputsVals] = useState({
    email: '',
    password: '',
  })

  const isValid = () =>
    /.+@.+\..+/.test(inputsVals.email) && inputsVals.password.length >= 6

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault()
    isValid() && handleSubmit(e, inputsVals)
  }
  const changeState = (key: string) => (value: string) => {
    setInputsVals({
      ...inputsVals,
      [key]: value,
    })
  }

  return (
    <div className='measure center mt4'>
      <form onSubmit={submitForm}>
        <fieldset className='ba b--transparent ph0 mh0 mb3'>
          <legend className='f3 fw6 ph0 mh0 mb4'>Log in or sign up</legend>
          {[
            { type: 'email', text: 'Email' },
            { type: 'password', text: 'Password' },
          ].map(v => (
            <Input
              key={v.type}
              label={v.text}
              className='pa2 mv2 w-100'
              type={v.type}
              name={v.type}
              id={v.type}
              value={inputsVals[v.type]}
              onChange={changeState(v.type)}
            />
          ))}
        </fieldset>
        <input className='hidden' type='submit' />
      </form>
      <div>
        {[
          { text: 'Log in', action: submitForm },
          {
            text: 'Sign up',
            action: () => handleSignUp(inputsVals),
          },
        ].map((v, i) => (
          <Button
            disabled={!isValid()}
            key={i}
            onClick={v.action}
            isLarge
            className='mr3'
          >
            {v.text}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default LoginForm
