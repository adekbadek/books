// @flow

import type { InputEvent } from 'utils/types'

import debounce from 'lodash.debounce'
import AutosizingTextarea from 'react-textarea-autosize'
import React from 'react'
import classnames from 'classnames'

export default class InputField extends React.Component {
  props: {
    initialValue: string,
    onSubmit: (string: string) => void,
    allowNewline?: boolean,
    label?: string,
    placeholder?: string,
    wrapperClassName?: string,
    className?: string,
  }
  state = {
    value: this.props.initialValue || '',
    isEdited: false,
    id: `id-${String(Math.random()).substring(2)}`,
  }
  handleChange = (e: InputEvent) => {
    this.setState({value: e.currentTarget.value})
  }
  handleSubmit = () => {
    this.textAreaRef && this.textAreaRef.blur()
    if (this.state.value !== this.props.initialValue) {
      this.props.onSubmit(this.state.value)
    }
  }
  submit = debounce(this.handleSubmit, 200)
  handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !this.props.allowNewline) {
      e.preventDefault()
      this.submit()
    }
  }
  textAreaRef = {}
  render () {
    const {label, placeholder, wrapperClassName, className} = this.props
    return (
      <div className={classnames(wrapperClassName, 'flex items-start')}>
        {label && <label htmlFor={this.state.id} className='pt2 w-10 mr1'>{label}</label>}
        <AutosizingTextarea
          id={this.state.id}
          className={classnames(className || 'pa2')}
          placeholder={placeholder}
          value={this.state.value}
          onBlur={this.submit}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          inputRef={v => { this.textAreaRef = v }}
        />
      </div>
    )
  }
}
