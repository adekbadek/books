// @flow

import type { MainState } from 'utils/types'

export const filteredBooksSelector = (booksState: MainState, filters: {}) => {
  const query = booksState.filterInput
  const regexp = query && new RegExp(query, 'i')
  return booksState.books
    .filter(v => !query || v.title.match(regexp || ''))
    .filter(filters[booksState.filterType].predicate)
}
