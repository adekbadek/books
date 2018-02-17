// @flow

import type { InputEvent } from 'utils/types'

import debounce from 'lodash.debounce'
import Textarea from 'react-textarea-autosize'
import React from 'react'

export default class InputField extends React.Component {
  props: {
    initialValue: string,
    onSubmit: (string: string) => void,
    allowNewline?: boolean,
  }
  state = {
    value: this.props.initialValue || '',
    isEdited: false,
  }
  handleChange = (e: InputEvent) => {
    this.setState({value: e.currentTarget.value})
  }
  handleSubmit = () => {
    this.textAreaRef && this.textAreaRef._rootDOMNode.blur()
    if (this.state.value !== this.props.initialValue) {
      this.props.onSubmit(this.state.value)
    }
  }
  submit = debounce(this.handleSubmit, 100)
  handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !this.props.allowNewline) {
      e.preventDefault()
      this.submit()
    }
  }
  textAreaRef = {}
  render () {
    return (
      <Textarea
        value={this.state.value}
        onBlur={this.submit}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        ref={v => { this.textAreaRef = v }}
      />
    )
  }
}
