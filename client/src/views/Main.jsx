// @flow

import type { Book, User, Repetition } from 'utils/types'

import React from 'react'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { update } from 'ramda'

import BookRow from 'components/BookRow'
import Calendar from 'components/Calendar'
import Table from 'components/Table'
import RouteLink from 'components/RouteLink'
import Filters from 'components/Filters'
import InputForm from 'components/InputForm'
import withUserInfo from 'components/hoc/withUserInfo'

import {
  getVisibleReps,
  getHeadersAndCols,
  filterBooksByFilterType,
} from 'utils/aux'
import { filteredBooksSelector } from 'store/selectors'
import actions from 'store/actions'

import {
  request,
  readCredentials,
  revokeCredentials,
  getBooksURL,
  getAuthViewURL,
  getUserSettingsViewURL,
} from 'utils/api.js'
import { getAllReps, displayBookTitle } from 'utils/aux.js'
import { DATE_FORMAT } from 'utils/time.js'

const { setBooks, fetchBooks } = actions

@connect(
  state => ({
    books: state.books.books,
    filteredBooks: filteredBooksSelector(state),
    repetitions: getAllReps(state.books.books),
    filterInput: state.ui.filterInput,
    filterType: state.ui.filterType,
  }),
  {setBooks, fetchBooks}
)
@withUserInfo
export default class Main extends React.Component {
  props: {
    setBooks: ({books: Array<Book>}) => void,
    fetchBooks: () => void,
    books: Array<Book>,
    filteredBooks: Array<Book>,
    repetitions: Array<Repetition>,
    user: User,
    filterInput: string,
    filterType: string,
  }
  state: {
    createBookInputVal: string,
    editedBookId: null | $PropertyType<Book, 'id'>,
    authenticated: boolean,
  } = {
    createBookInputVal: '',
    editedBookId: null,
    authenticated: !!readCredentials(),
  }
  componentDidMount () {
    this.props.fetchBooks()
  }
  createBook = (title: string) => {
    request({
      url: getBooksURL(),
      method: 'POST',
      data: {
        title,
      },
    })
      .then(book => {
        this.props.setBooks({books: this.props.books.concat([book])})
      })
  }
  deleteBook = (id: $PropertyType<Book, 'id'>) => {
    request({
      url: getBooksURL(id),
      method: 'DELETE'
    })
      .then(() => {
        this.props.setBooks({books: this.props.books.filter(v => v.id !== id)})
      })
  }
  updateBook = (id: $PropertyType<Book, 'id'>, updatedBookIndex: number, updateData: {}) => {
    request({
      url: getBooksURL(id),
      method: 'PATCH',
      data: updateData,
    })
      .then(book => {
        this.props.setBooks({books: update(updatedBookIndex, book, this.props.books)})
        this.setState({editedBookId: null})
      })
  }
  getTodaysReps = (): Array<Repetition> => {
    return this.props.repetitions.filter(rep => moment().isSame(rep.date, 'day'))
  }
  render () {
    if (!this.state.authenticated) {
      return <Redirect to={getAuthViewURL()} />
    }

    const todaysReps = this.getTodaysReps()
    return (
      <div>
        <div className='top'>
          <h1 className='dib mt0'>books</h1>
          <RouteLink
            url={getAuthViewURL()}
            className='fr'
            borderButton
            beforeAction={revokeCredentials}
          >logout</RouteLink>
          <RouteLink
            url={getUserSettingsViewURL()}
            className='fr pa1 pr2'
          >{this.props.user.email}</RouteLink>
        </div>
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
                  {this.props.repetitions.map((rep, i) => {
                    return moment().isBefore(rep.date) && <tr key={i}>
                      <td className='tooltip__wrapper'>
                        <span className='tooltip' data-info={moment(rep.date).format(DATE_FORMAT)} />
                        {moment(rep.date).fromNow(true)}
                      </td>
                      <td>{displayBookTitle(rep.title)}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </td>
          </tr>
        </Table>
        <Calendar
          ranges={this.props.books.map(book => (
            {
              start: book.start_date,
              end: book.end_date || book.on_hold,
              name: book.title,
              isDimmed: !!book.on_hold,
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
              deleteHandler={this.deleteBook}
              updateHandler={data => this.updateBook(book.id, this.props.books.indexOf(book), data)}
              isEdited={this.state.editedBookId === book.id}
              onClickHandler={() => this.setState({editedBookId: book.id})}
            />
          )}
        </Table>
        <InputForm onSubmit={this.createBook} />
      </div>
    )
  }
}
