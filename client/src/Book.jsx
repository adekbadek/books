import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'tachyons/css/tachyons.min.css'

import { buttonClasses } from './utils/styling.js'
import { DATE_FORMAT } from './utils/time.js'
import { times } from './utils/aux.js'

const ROW_CLASSES = 'pv2 pr3 bb b--black-20'

class EditBookTitle extends React.Component {
  render () {
    return (
      <form className='dib' onSubmit={e => {
        e.preventDefault()
        this.props.updateHandler({title: this.refs.input.value})
      }}>
        <input autoFocus type='text' defaultValue={this.props.book.title} ref='input' />
        <input type='submit' value='submit' className={`ml1 ${buttonClasses}`} />
      </form>
    )
  }
}

export default props =>
  <tr>
    <td className={ROW_CLASSES} onClick={props.onClickHandler}>
      <div className='dib'>
        {props.isEdited
          ? <EditBookTitle book={props.book} updateHandler={props.updateHandler} />
          : <span>{props.book.title}</span>
        }
      </div>
    </td>
    <td className={ROW_CLASSES}>
      <DatePicker
        dateFormat={DATE_FORMAT}
        locale='en-gb'
        isClearable
        selected={props.book.start_date ? moment(props.book.start_date) : null}
        highlightDates={props.book.end_date && [moment(props.book.end_date)]}
        maxDate={props.book.end_date ? moment(props.book.end_date) : moment()}
        placeholderText='Select a start date'
        onChange={e => props.updateHandler({start_date: e ? e.format() : null})}
      />
    </td>
    <td className={ROW_CLASSES}>
      <DatePicker
        dateFormat={DATE_FORMAT}
        locale='en-gb'
        isClearable
        selected={props.book.end_date ? moment(props.book.end_date) : null}
        highlightDates={props.book.start_date && [moment(props.book.start_date)]}
        minDate={props.book.start_date ? moment(props.book.start_date) : null}
        maxDate={moment()}
        placeholderText='Select an end date'
        onChange={e => props.updateHandler({end_date: e ? e.format() : null})}
      />
    </td>
    <td className={ROW_CLASSES}>
      {times(3).map((_, i) => {
        const repDate = props.book[`rep_${i + 1}`]
        return (
          repDate ? <div key={i} className={`dib reps-indicator ${moment().isBefore(repDate) ? 'reps-indicator__upcoming' : ''}`} title={repDate} /> : null
        )
      })}
    </td>
    <td className={ROW_CLASSES}>
      <button
        className={buttonClasses}
        onClick={() => {
          props.deleteHandler(props.book.id)
        }}
      >rm</button>
    </td>
  </tr>
