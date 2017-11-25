// @flow

import memoize from 'lodash.memoize'

import { FILTERS } from 'utils/filters.js'

const filteredBooksSelectorFn = (state) => {
  const query = state.ui.filterInput
  const regexp = query ? new RegExp(query, 'i') : ''
  return state.books.books
    .filter(book => (
      (!query || book.title.match(regexp)) &&
      FILTERS[state.ui.filterType].predicate(book)
    ))
}

export const filteredBooksSelector = memoize(filteredBooksSelectorFn)
