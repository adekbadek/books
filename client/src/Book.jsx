import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class EditBookTitle extends React.Component {
  render () {
    return (
      <form className='dib' onSubmit={e => {
        e.preventDefault()
        this.props.updateHandler({title: this.refs.input.value})
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
        ? <EditBookTitle book={props.book} updateHandler={props.updateHandler} />
        : <span>{props.book.title}</span>
      }
    </div>
    <DatePicker
      selected={props.book.start_date ? moment(props.book.start_date) : null}
      maxDate={moment()}
      placeholderText='Select a start date'
      onChange={e => props.updateHandler({start_date: e.format()})}
    />
    <DatePicker
      selected={props.book.end_date ? moment(props.book.end_date) : null}
      minDate={props.book.start_date ? moment(props.book.start_date) : null}
      maxDate={moment()}
      placeholderText='Select an end date'
      onChange={e => props.updateHandler({end_date: e.format()})}
    />
  </div>
