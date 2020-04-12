// @flow

import type { Book } from 'utils/types'

import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import BookRow from 'components/BookRow'
import Table from 'components/Table'
import Filters from 'components/Filters'
import InputForm from 'components/InputForm'
import TimeViewer from 'components/TimeViewer'
import BookLink from 'components/BookLink'
import Todos from 'components/Todos'

import { getHeadersAndCols, filterBooksByFilterType } from 'utils/aux'
import { readCredentials, AUTH_VIEW_URL } from 'utils/api'
import { filteredBooksSelector } from 'store/selectors'
import { booksActions } from 'store/actions'

@connect(
  state => ({
    books: state.books.books,
    filteredBooks: filteredBooksSelector(state),
    filterInput: state.ui.filterInput,
    filterType: state.ui.filterType,
    editedBookId: state.ui.editedBookId,
  }),
  booksActions
)
export default class Main extends React.Component {
  props: {
    fetchBooks: () => void,
    createBook: (title: string) => void,
    books: Array<Book>,
    filteredBooks: Array<Book>,
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
  render () {
    if (!this.state.authenticated) {
      return <Redirect to={AUTH_VIEW_URL} />
    }

    return (
      <div>
        <Todos />
        <Table
          wrapperClassName='pt4'
          tableClassName='table--align-top'
          headers={['Currently reading']}
        >
          <tr>
            <td>
              {filterBooksByFilterType(this.props.books, 'CURRENT').map(
                book => (
                  <div key={book.id}>
                    <BookLink className='pt1' book={book} />
                  </div>
                )
              )}
            </td>
          </tr>
        </Table>
        <TimeViewer
          ranges={this.props.books.map(book => ({
            start: book.start_date,
            end: book.end_date || book.on_hold,
            name: book.title,
            bookId: book.id,
            isOnHold: !!book.on_hold,
          }))}
          points={this.props.books.map(book => ({
            name: book.title,
            dates: [],
          }))}
        />
        <Filters />
        <Table
          headers={getHeadersAndCols(this.props.filterType).headers}
          tableClassName='table--booklist'
        >
          {this.props.filteredBooks.map(book => (
            <BookRow
              key={book.id}
              columns={getHeadersAndCols(this.props.filterType).cols}
              book={book}
            />
          ))}
        </Table>
        <InputForm onSubmit={this.props.createBook} />
      </div>
    )
  }
}
