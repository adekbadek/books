// @flow

import type { Store } from 'utils/types'

import { find } from 'ramda'

import { filterWithType } from 'utils/filters'
import { sortByDate } from 'utils/aux'

export const filteredBooksSelector = (state: Store) => {
  const query = state.ui.filterInput
  const regexp = query ? new RegExp(query, 'i') : ''
  let filteredByType = filterWithType(state.ui.filterType, state.books.books)
  if (query) {
    filteredByType.filter(book => book.title.match(regexp))
  }
  return filteredByType.sort(sortByDate('end_date', true))
}

export const bookById = (state: Store) => (bookId: string) =>
  find(book => book.id === Number(bookId), state.books.books)
