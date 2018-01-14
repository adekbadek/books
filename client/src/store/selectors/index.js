// @flow

import type { Store } from 'utils/types'

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
