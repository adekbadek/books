// @flow

import type { Store } from 'utils/types'

import { filter, complement, prop, find, sort } from 'ramda'

import { filterWithType } from 'utils/filters'
import { sortByDate } from 'utils/aux'

export const filteredBooksSelector = (state: Store) => {
  const query = state.ui.filterInput
  const regexp = query ? new RegExp(query, 'i') : ''
  let filteredByType = filterWithType(state.ui.filterType, state.books.books)
  if (query) {
    filteredByType = filteredByType.filter(book => book.title.match(regexp))
  }
  return filteredByType.sort(sortByDate('start_date', true))
}

export const bookById = (bookId: string) => (state: Store) =>
  find(book => book.id === Number(bookId), state.books.books)

export const todosCollection = ({ all }: { all: boolean } = { all: true }) => ({
  todos,
}: Store) =>
  sort(
    sortByDate('due_date'),
    all ? todos.todos : filter(complement(prop('is_completed')), todos.todos)
  )
