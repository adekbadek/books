// @flow

import React, { useState } from 'react'
import cx from 'classnames'

import type { AuthFormFields, InputEvent } from 'utils/types'

const BUTTON_CLASSES =
  'b ph3 pv2 mr2 input-reset ba b--black bg-transparent pointer f6 dib'

const Input = ({ onChange, ...props }) => (
  <input
    onChange={(e: InputEvent) => onChange(e.currentTarget.value)}
    {...props}
  />
)

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

  const buttonProps = {
    className: cx(BUTTON_CLASSES, { disabled: !isValid() }),
    disabled: !isValid(),
  }
  return (
    <div className='measure center mt4'>
      <form onSubmit={submitForm}>
        <fieldset className='ba b--transparent ph0 mh0 mb3'>
          <legend className='f4 fw6 ph0 mh0'>Log in or sign up</legend>
          {[
            { type: 'email', text: 'Email' },
            { type: 'password', text: 'Password' },
          ].map(v => (
            <div key={v.type} className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor={v.type}>
                {v.text}
              </label>
              <Input
                className='pa2 input-reset ba bg-transparent w-100'
                type={v.type}
                name={v.type}
                id={v.type}
                value={inputsVals[v.type]}
                onChange={changeState(v.type)}
              />
            </div>
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
          <button {...buttonProps} key={i} onClick={v.action}>
            {v.text}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LoginForm
