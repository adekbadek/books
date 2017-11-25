// @flow

import type { Book } from 'utils/types'

import React from 'react'
import moment from 'moment'

import PopUpMenu from 'components/PopUpMenu'
import DateChooser from 'components/DateChooser'
import { borderButtonClasses } from 'utils/styling.js'
import { DATE_FORMAT } from 'utils/time.js'
import { getVisibleReps } from 'utils/aux.js'

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

const DateCell = ({book, props, prop}) => {
  const isStart = prop === 'start_date'
  const isOnHold = prop === 'on_hold'
  const isEnd = prop === 'end_date'
  return (
    <DateChooser
      selected={book[prop] ? moment(book[prop]) : null}
      highlightDates={book[prop] && [moment(book[prop])]}
      onChange={e => props.updateHandler({[prop]: e ? e.format() : null})}
      placeholderText={`${prop.replace(/_/g, ' ')}`}
      isClearable={isStart ? !book.end_date && !book.on_hold : true}
      maxDate={isStart ? (
        (book.end_date || book.on_hold) ? moment((book.end_date || book.on_hold)) : moment()
      ) : moment()}
      minDate={!isStart && book.start_date ? moment(book.start_date) : null}
      disabled={!isStart && (
        !book.start_date || (isEnd && book.on_hold) || (isOnHold && book.end_date)
      )}
    />
  )
}

export default ({book, ...props}: BookRowProps) => {
  const getCell = (col) => ({
    title: (
      <div className='dib' onClick={props.onClickHandler}>
        {props.isEdited
          ? <EditBookTitle book={book} updateHandler={props.updateHandler} />
          : <span>{book.title}</span>
        }
      </div>
    ),
    reps: (
      getVisibleReps(book).map((date, j) =>
        date && <div
          key={j}
          className={`dib reps-indicator ${moment().isBefore(date) ? 'reps-indicator__upcoming' : ''}`}
          title={moment(date).format(DATE_FORMAT)}
        />
      )
    ),
    date: <DateCell book={book} props={props} prop={col.prop} />,
    actions: (
      <PopUpMenu>
        <button
          className={borderButtonClasses}
          onClick={() => {
            props.deleteHandler(book.id)
          }}
        >remove</button>
        {getVisibleReps(book).length > 0 && <button
          className={borderButtonClasses}
          onClick={() => props.updateHandler({reps: null})}
        >remove reps</button>}
      </PopUpMenu>
    ),
  }[col.component])
  return (
    <tr>
      {props.columns.map((col, i) => (
        <td key={i} className='pv2 pr3 bb b--black-20'>
          {getCell(col)}
        </td>
      ))}
    </tr>
  )
}
