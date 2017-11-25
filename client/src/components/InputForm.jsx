// @flow

import * as React from 'react'

export default class InputForm extends React.Component {
  state = {
    val: '',
  }
  onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    this.props.onSubmit(this.state.val)
    this.setState({val: ''})
  }
  onChange = ({ target }: SyntheticInputEvent) => {
    this.setState({val: target.value})
  }
  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <input type='text' placeholder='title' value={this.state.val} onChange={this.onChange} />
        <input type='submit' value='add' className='ml1 ba b--black bg-transparent pointer' />
      </form>
    )
  }
}
