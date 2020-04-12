// @flow

import React, { useState } from 'react'

const InputForm = ({ onSubmit }) => {
  const [val, setVal] = useState('')

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    onSubmit(val)
    setVal('')
  }

  const onChange = ({ target }: SyntheticInputEvent) => {
    setVal(target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='pa1 pl2'
        type='text'
        placeholder='title'
        value={val}
        onChange={onChange}
      />
      <input
        type='submit'
        value='add'
        className='pv1 ph2 ml1 ba b--black bg-transparent pointer'
      />
    </form>
  )
}

export default InputForm
