// @flow

import React from 'react'
import cx from 'classnames'

import type { AuthFormFields, InputEvent } from 'utils/types'

const BUTTON_CLASSES = 'b ph3 pv2 mr2 input-reset ba b--black bg-transparent pointer f6 dib'

const Input = ({onChange, ...props}) =>
  <input
    onChange={(e: InputEvent) => onChange(e.currentTarget.value)}
    {...props}
  />

export default class LoginForm extends React.Component {
  state : AuthFormFields = {
    email: '',
    password: '',
  }
  submitForm = (e: SyntheticEvent) => {
    e.preventDefault()
    this.isValid() && this.props.handleSubmit(e, this.state)
  }
  isValid = () => (
    /.+@.+\..+/.test(this.state.email) && this.state.password.length >= 6
  )
  changeState = (key: string) => (value: string) => {
    this.setState({[key]: value})
  }
  render () {
    const buttonProps = {
      className: cx(BUTTON_CLASSES, {'disabled': !this.isValid()}),
      disabled: !this.isValid(),
    }
    return (
      <div className='measure center mt4'>
        <form onSubmit={this.submitForm}>
          <fieldset className='ba b--transparent ph0 mh0 mb3'>
            <legend className='f4 fw6 ph0 mh0'>Log in or sign up</legend>
            {[
              {type: 'email', text: 'Email', key: 'email'},
              {type: 'password', text: 'Password', key: 'password'},
            ].map((v) => (
              <div key={v.key} className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor={v.key}>{v.text}</label>
                <Input
                  className='pa2 input-reset ba bg-transparent w-100'
                  type={v.type}
                  name={v.key}
                  id={v.key}
                  value={this.state[v.key]}
                  onChange={this.changeState(v.key)}
                />
              </div>
            ))}
          </fieldset>
          <input className='hidden' type='submit' />
        </form>
        <div>
          {[
            {text: 'Log in', action: this.submitForm},
            {text: 'Sign up', action: () => this.props.handleSignUp(this.state)},
          ].map((v, i) => (
            <button
              {...buttonProps}
              key={i}
              onClick={v.action}
            >{v.text}</button>
          ))}
        </div>
      </div>
    )
  }
}
