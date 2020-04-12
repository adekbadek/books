// @flow

import type { Action, BooksState } from 'utils/types'

import { merge, uniqBy, prop } from 'ramda'

const initialState = {
  books: [],
}

export default (
  state: BooksState = initialState,
  action: Action
): BooksState => {
  const { payload } = action
  switch (action.type) {
    case 'SET_BOOKS':
      return merge(state, { ...payload })
    case 'ADD_BOOK':
      return merge(state, {
        books: uniqBy(prop('id'), [action.payload.book, ...state.books]),
      })
    case 'FLUSH_STORE':
      return initialState
    default:
      return state
  }
}
