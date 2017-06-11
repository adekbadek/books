// @flow

import type { Book } from 'utils/types'

import React from 'react'
import moment from 'moment'

import PopUpMenu from 'components/PopUpMenu'
import DateChooser from 'components/DateChooser'
import { borderButtonClasses } from 'utils/styling.js'
import { DATE_FORMAT } from 'utils/time.js'
import { getRepDates } from 'utils/aux.js'

const ROW_CLASSES = 'pv2 pr3 bb b--black-20'

class EditBookTitle extends React.Component {
  render () {
    return (
      <form className='dib' onSubmit={e => {
        e.preventDefault()
        this.props.updateHandler({title: this.refs.input.value})
      }}>
        <input autoFocus type='text' defaultValue={this.props.book.title} ref='input' />
        <input type='submit' value='submit' className={`ml1 ${borderButtonClasses}`} />
      </form>
    )
  }
}

type BookRowProps = {
  book: Book,
  deleteHandler: $PropertyType<Book, 'id'> => void,
  onClickHandler: () => void,
  updateHandler: ({}) => void,
}

export default (props: BookRowProps) =>
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
      <DateChooser
        selected={props.book.start_date ? moment(props.book.start_date) : null}
        highlightDates={props.book.end_date && [moment(props.book.end_date)]}
        maxDate={props.book.end_date ? moment(props.book.end_date) : moment()}
        placeholderText='Select a start date'
        onChange={e => props.updateHandler({start_date: e ? e.format() : null})}
      />
    </td>
    <td className={ROW_CLASSES}>
      <DateChooser
        selected={props.book.end_date ? moment(props.book.end_date) : null}
        highlightDates={props.book.start_date && [moment(props.book.start_date)]}
        minDate={props.book.start_date ? moment(props.book.start_date) : null}
        maxDate={moment()}
        placeholderText='Select an end date'
        onChange={e => props.updateHandler({end_date: e ? e.format() : null})}
      />
    </td>
    <td className={ROW_CLASSES}>
      {getRepDates(props.book).map((date, i) =>
        date && <div
          key={i}
          className={`dib reps-indicator ${moment().isBefore(date) ? 'reps-indicator__upcoming' : ''}`}
          title={moment(date).format(DATE_FORMAT)}
        />
      )}
    </td>
    <td className={ROW_CLASSES}>
      <PopUpMenu>
        <button
          className={borderButtonClasses}
          onClick={() => {
            props.deleteHandler(props.book.id)
          }}
        >remove</button>
        {props.book.rep_1 && <button
          className={borderButtonClasses}
          onClick={() => {
            props.updateHandler({
              rep_1: null,
              rep_2: null,
              rep_3: null,
            })
          }}
        >remove reps</button>}
      </PopUpMenu>
    </td>
  </tr>
