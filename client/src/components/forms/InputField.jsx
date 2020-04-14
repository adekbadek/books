// @flow

import type { InputEvent } from 'utils/types'

import React, { useState, useRef } from 'react'
import debounce from 'lodash.debounce'
import AutosizingTextarea from 'react-textarea-autosize'
import classnames from 'classnames'

const InputField = ({
  initialValue,
  onSubmit,
  label,
  placeholder,
  wrapperClassName,
  className,
}) => {
  const [value, setValue] = useState(initialValue || '')
  const [id] = useState(`id-${String(Math.random()).substring(2)}`)

  const textAreaRef = useRef()

  const handleChange = (e: InputEvent) => setValue(e.currentTarget.value)

  const handleSubmit = () => {
    textAreaRef.current && textAreaRef.current.blur()
    if (value !== initialValue) {
      onSubmit(value)
    }
  }
  const submit = debounce(handleSubmit, 200)

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className={classnames(wrapperClassName, 'flex items-start')}>
      {label && (
        <label htmlFor={id} className='pt2 w-10 mr1'>
          {label}
        </label>
      )}
      <AutosizingTextarea
        id={id}
        className={classnames(className || 'pa2')}
        placeholder={placeholder}
        value={value}
        onBlur={submit}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        inputRef={textAreaRef}
      />
    </div>
  )
}

export default InputField
