// @flow

import type { Store } from 'utils/types'

import { find } from 'ramda'

import { filterWithType } from 'utils/filters'

export const filteredBooksSelector = (state: Store) => {
  const query = state.ui.filterInput
  const regexp = query ? new RegExp(query, 'i') : ''
  const filteredByType = filterWithType(state.ui.filterType, state.books.books)
  if (query) {
    return filteredByType.filter(book => book.title.match(regexp))
  } else {
    return filteredByType
  }
}

export const bookById = (state: Store) => (bookId: string) => (
  find(book => book.id === Number(bookId), state.books.books)
)
