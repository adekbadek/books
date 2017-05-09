import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'tachyons/css/tachyons.min.css'

class EditBookTitle extends React.Component {
  render () {
    return (
      <form className='dib' onSubmit={e => {
        e.preventDefault()
        this.props.updateHandler({title: this.refs.input.value})
      }}>
        <input autoFocus type='text' defaultValue={this.props.book.title} ref='input' />
        <input type='submit' value='submit' className='ml1 ba b--black bg-transparent pointer' />
      </form>
    )
  }
}

export default props =>
  <tr>
    <td className='pv2 pr3 bb b--black-20' onClick={props.onClickHandler}>
      <div className='dib'>
        {props.isEdited
          ? <EditBookTitle book={props.book} updateHandler={props.updateHandler} />
          : <span>{props.book.title}</span>
        }
      </div>
    </td>
    <td className='pv2 pr3 bb b--black-20'>
      <DatePicker
        locale='en-gb'
        selected={props.book.start_date ? moment(props.book.start_date) : null}
        maxDate={moment()}
        placeholderText='Select a start date'
        onChange={e => props.updateHandler({start_date: e.format()})}
      />
    </td>
    <td className='pv2 pr3 bb b--black-20'>
      <DatePicker
        locale='en-gb'
        selected={props.book.end_date ? moment(props.book.end_date) : null}
        minDate={props.book.start_date ? moment(props.book.start_date) : null}
        maxDate={moment()}
        placeholderText='Select an end date'
        onChange={e => props.updateHandler({end_date: e.format()})}
      />
    </td>
    <td className='pv2 pr3 bb b--black-20'>
      <button
        className='ba b--black bg-transparent pointer'
        onClick={() => {
          props.deleteHandler(props.book.id)
        }}
      >delete</button>
    </td>
  </tr>
