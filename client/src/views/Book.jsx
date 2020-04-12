// @flow

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import InputField from 'components/InputField'
import DateChooser from 'components/DateChooser'
import { bookById } from 'store/selectors'
import { booksActions } from 'store/actions'
import { ROOT_VIEW_URL } from 'utils/api.js'

const Book = ({ bookId }) => {
  const dispatch = useDispatch()
  const book = useSelector(bookById(bookId))

  useEffect(() => {
    dispatch(booksActions.fetchSingleBook(bookId))
  }, [bookId])
  const history = useHistory()

  if (book === undefined) {
    return 'Book not found'
  }

  const handleDeleteBook = () => {
    if (window.confirm(`Remove ${book.title}?`)) {
      dispatch(booksActions.deleteBook(book.id))
      history.push(ROOT_VIEW_URL)
    }
  }

  const handleUpdate = keyName => value => {
    dispatch(
      booksActions.updateBook({
        id: book.id,
        updateData: {
          [keyName]: value,
        },
      })
    )
  }

  return (
    <div>
      <InputField
        placeholder='add title'
        className='b w-100 pa0 f2 mv4'
        initialValue={book.title}
        onSubmit={handleUpdate('title')}
      />
      <InputField
        label='Author:'
        placeholder='add author'
        initialValue={book.author_name}
        onSubmit={handleUpdate('author_name')}
        wrapperClassName='mb1'
      />

      {[
        {
          label: 'Start date:',
          placeholder: 'start date',
          prop: 'start_date',
        },
        {
          label: 'On hold:',
          placeholder: 'on hold date',
          prop: 'on_hold',
        },
        {
          label: 'End date:',
          placeholder: 'end date',
          prop: 'end_date',
        },
      ].map(({ label, placeholder, prop }) => {
        const isStart = prop === 'start_date'
        const isOnHold = prop === 'on_hold'
        const isEnd = prop === 'end_date'

        return (
          <div key={prop} className='flex items-center mb2'>
            <label htmlFor='sdf' className='w-10 mr1'>
              {label}
            </label>
            <DateChooser
              className='ml2 ph2 pv1'
              selected={book[prop] ? moment(book[prop]) : null}
              highlightDates={book[prop] && [moment(book[prop])]}
              onChange={date => handleUpdate(prop)(date ? date.format() : null)}
              placeholderText={placeholder}
              isClearable={isStart ? !book.end_date && !book.on_hold : true}
              maxDate={
                isStart
                  ? book.end_date || book.on_hold
                    ? moment(book.end_date || book.on_hold)
                    : moment()
                  : moment()
              }
              minDate={
                !isStart && book.start_date ? moment(book.start_date) : null
              }
              disabled={
                !isStart &&
                (!book.start_date ||
                  (isEnd && book.on_hold) ||
                  (isOnHold && book.end_date))
              }
            />
          </div>
        )
      })}

      <div className='mt4'>
        <button
          className='ba b--black bg-transparent pointer'
          onClick={handleDeleteBook}
        >
          delete book
        </button>
      </div>
    </div>
  )
}

export default Book
