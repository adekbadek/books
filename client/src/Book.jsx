import React from 'react'

class EditBookTitle extends React.Component {
  render () {
    return (
      <form className='dib' onSubmit={e => {
        e.preventDefault()
        this.props.onSaveHandler(this.refs.input.value)
      }}>
        <input autoFocus type='text' defaultValue={this.props.book.title} ref='input' />
        <input type='submit' value='submit' />
      </form>
    )
  }
}

export default props =>
  <div>
    <button onClick={() => {
      props.deleteHandler(props.book.id)
    }}>delete</button>
    <div className='dib' onClick={props.onClickHandler}>
      {props.isEdited
        ? <EditBookTitle book={props.book} onSaveHandler={props.onSaveHandler} />
        : <span>{props.book.title}</span>
      }
    </div>
  </div>
