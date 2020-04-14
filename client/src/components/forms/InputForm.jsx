// @flow

import React, { useState } from 'react'

import Button from 'components/Button'
import Input from 'components/forms/Input'

const InputForm = ({ onSubmit }) => {
  const [val, setVal] = useState('')

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    onSubmit(val)
    setVal('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input placeholder='title' value={val} onChange={setVal} />
      <Button as='input' type='submit' value='add' className='ml3' />
    </form>
  )
}

export default InputForm
