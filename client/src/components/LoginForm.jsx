import React from 'react'

const BUTTON_CLASSES = 'b ph3 pv2 mr2 input-reset ba b--black bg-transparent pointer f6 dib'

class LoginForm extends React.Component {
  constructor () {
    super()
    this.submitForm = this.submitForm.bind(this)
  }
  getFields () {
    return {
      email: this.refs.email.value,
      password: this.refs.password.value,
    }
  }
  submitForm (e) {
    this.props.handleSubmit(e, this.getFields())
  }
  render () {
    return (
      <div className='pt5 measure center'>
        <form onSubmit={this.submitForm}>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f4 fw6 ph0 mh0'>Log in or sign up</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='email-address'>Email</label>
              <input ref='email' className='pa2 input-reset ba bg-transparent w-100' type='email' name='email-address' id='email-address' />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='password'>Password</label>
              <input ref='password' className='b pa2 input-reset ba bg-transparent w-100' type='password' name='password' id='password' />
            </div>
          </fieldset>
          <input className='hidden' type='submit' />
        </form>
        <div>
          <button
            className={BUTTON_CLASSES}
            onClick={this.submitForm}
          >Log in</button>
          <button
            className={BUTTON_CLASSES}
            onClick={() => this.props.handleSignUp(this.getFields())}
          >Sign Up</button>
        </div>
      </div>
    )
  }
}

export default LoginForm
