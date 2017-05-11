import React from 'react'

export default props =>
  <div className='pt4'>
    <form onSubmit={props.handleSubmit} className='measure center'>
      <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
        <legend className='f4 fw6 ph0 mh0'>Sign In</legend>
        <div className='mt3'>
          <label className='db fw6 lh-copy f6' htmlFor='email-address'>Email</label>
          <input className='pa2 input-reset ba bg-transparent w-100' type='email' name='email-address' id='email-address' />
        </div>
        <div className='mv3'>
          <label className='db fw6 lh-copy f6' htmlFor='password'>Password</label>
          <input className='b pa2 input-reset ba bg-transparent w-100' type='password' name='password' id='password' />
        </div>
      </fieldset>
      <div>
        <input className='b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib' type='submit' value='Sign in' />
      </div>
    </form>
  </div>
