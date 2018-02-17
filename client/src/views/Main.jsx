// @flow

import type { Book, Repetition, BookUpdatePayload } from 'utils/types'

import React from 'react'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import BookRow from 'components/BookRow'
import Table from 'components/Table'
import Filters from 'components/Filters'
import InputForm from 'components/InputForm'
import TimeViewer from 'components/TimeViewer'

import {
  getVisibleReps,
  getHeadersAndCols,
  filterBooksByFilterType,
} from 'utils/aux'
import { filteredBooksSelector } from 'store/selectors'
import { booksActions } from 'store/actions'

import {
  readCredentials,
  getAuthViewURL,
} from 'utils/api.js'
import { sortByDates, getAllReps, displayBookTitle } from 'utils/aux.js'
import { DATE_FORMAT } from 'utils/time.js'

const MAX_REPS = 5

@connect(
  state => ({
    books: state.books.books,
    filteredBooks: filteredBooksSelector(state),
    repetitions: getAllReps(state.books.books),
    filterInput: state.ui.filterInput,
    filterType: state.ui.filterType,
    editedBookId: state.ui.editedBookId,
  }),
  booksActions,
)
export default class Main extends React.Component {
  props: {
    fetchBooks: () => void,
    createBook: (title: string) => void,
    deleteBook: () => void,
    updateBook: (BookUpdatePayload) => void,
    books: Array<Book>,
    filteredBooks: Array<Book>,
    repetitions: Array<Repetition>,
    filterInput: string,
    filterType: string,
    editedBookId: null | $PropertyType<Book, 'id'>,
  }
  state: {
    createBookInputVal: string,
    authenticated: boolean,
  } = {
    createBookInputVal: '',
    authenticated: !!readCredentials(),
  }
  componentDidMount () {
    this.props.fetchBooks()
  }
  getTodaysReps = (): Array<Repetition> => (
    this.props.repetitions.filter(rep => moment().isSame(rep.date, 'day'))
  )
  getUpcomingReps = (): Array<Repetition> => (
    this.props.repetitions
      .filter(({date}) => moment().isBefore(date))
      .sort(sortByDates)
  )
  render () {
    if (!this.state.authenticated) {
      return <Redirect to={getAuthViewURL()} />
    }

    const todaysReps = this.getTodaysReps()
    const upcomingReps = this.getUpcomingReps()
    const hiddenUpcoming = upcomingReps.length - MAX_REPS
    return (
      <div>
        {!!todaysReps.length && (
          <Table
            wrapperClassName='pt2'
            headers={['Today\'s repetitions']}
          >
            {todaysReps.map((rep, i) => <tr key={i}><td>{rep.title}</td></tr>)}
          </Table>
        )}
        <Table
          wrapperClassName='pt4'
          tableClassName='table--align-top'
          headers={['Currently reading', 'Upcoming repetitions']}
        >
          <tr>
            <td>
              {
                filterBooksByFilterType(this.props.books, 'CURRENT')
                  .map(book => (
                    <div className='pt1' key={book.id}>{displayBookTitle(book.title)}</div>
                  ))
              }
            </td>
            <td>
              <table>
                <tbody>
                  {upcomingReps
                    .slice(0, MAX_REPS)
                    .map((rep, i) => (
                      <tr key={i}>
                        <td className='tooltip__wrapper'>
                          <span className='tooltip' data-info={moment(rep.date).format(DATE_FORMAT)} />
                          {moment(rep.date).fromNow(true)}
                        </td>
                        <td className='pl2'>{displayBookTitle(rep.title)}</td>
                      </tr>
                    ))
                  }
                  {hiddenUpcoming > 0 && <tr><td className='pt1'>+ {hiddenUpcoming} more</td></tr>}
                </tbody>
              </table>
            </td>
          </tr>
        </Table>
        <TimeViewer
          ranges={this.props.books.map(book => (
            {
              start: book.start_date,
              end: book.end_date || book.on_hold,
              name: book.title,
              isOnHold: !!book.on_hold,
            }
          ))}
          points={this.props.books.map(book => (
            {
              name: book.title,
              dates: getVisibleReps(book),
            }
          ))}
        />
        <Filters />
        <Table
          headers={getHeadersAndCols(this.props.filterType).headers}
          tableClassName='table--short-inputs'
        >
          {this.props.filteredBooks.map(book =>
            <BookRow
              key={book.id}
              columns={getHeadersAndCols(this.props.filterType).cols}
              book={book}
              deleteHandler={this.props.deleteBook}
              updateHandler={data => this.props.updateBook({
                id: book.id,
                updateData: data,
              })}
            />
          )}
        </Table>
        <InputForm onSubmit={this.props.createBook} />
      </div>
    )
  }
}
