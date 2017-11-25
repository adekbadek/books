// @flow

import type { MainState } from 'utils/types'

import memoize from 'lodash.memoize'

import { FILTERS } from 'utils/filters.js'

const filteredBooksSelectorFn = (state: MainState) => {
  const query = state.filterInput
  const regexp = query ? new RegExp(query, 'i') : ''
  return state.books
    .filter(book => (
      (!query || book.title.match(regexp)) &&
      FILTERS[state.filterType].predicate(book)
    ))
}

export const filteredBooksSelector = memoize(filteredBooksSelectorFn)
