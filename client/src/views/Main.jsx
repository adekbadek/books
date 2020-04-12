// @flow

import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

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

export default () => {
  const books = useSelector(state => state.books.books)
  const filteredBooks = useSelector(state => filteredBooksSelector(state))
  const filterType = useSelector(state => state.ui.filterType)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(booksActions.fetchBooks())
  }, [])

  if (!readCredentials()) {
    return <Redirect to={AUTH_VIEW_URL} />
  }
  return (
    <div>
      <div className='flex flex-wrap flex-column flex-row-l'>
        <Todos className='pt2 flex-auto w-60-l' />
        <Table
          wrapperClassName='pt2 pl4-l flex-auto w-40-l'
          tableClassName='table--align-top'
          headers={['Currently reading']}
        >
          <tr>
            <td>
              {filterBooksByFilterType(books, 'CURRENT').map(book => (
                <div key={book.id}>
                  <BookLink className='pt1' book={book} />
                </div>
              ))}
            </td>
          </tr>
        </Table>
      </div>
      <TimeViewer />
      <Filters />
      <Table
        headers={getHeadersAndCols(filterType).headers}
        tableClassName='table--booklist'
      >
        {filteredBooks.map(book => (
          <BookRow
            key={book.id}
            columns={getHeadersAndCols(filterType).cols}
            book={book}
          />
        ))}
      </Table>
      <InputForm
        onSubmit={title => dispatch(booksActions.createBook({ title }))}
      />
    </div>
  )
}
