// @flow

import type { Book, Action } from 'utils/types'

import { FILTER_NAMES } from 'utils/filters.js'

type State = {
  +books: Array<Book>,
  +filterType: string,
  +filterInput?: string,
}

const initialState = {
  books: [],
  filterType: FILTER_NAMES[0],
}

export default (state: State = initialState, action: Action): State => {
  const {payload} = action
  switch (action.type) {
    case 'SET_BOOKS':
      return Object.assign({}, state, {...payload})
    case 'SET_FILTER_INPUT':
      return Object.assign({}, state, {filterInput: payload})
    case 'SET_FILTER_TYPE':
      return Object.assign({}, state, {filterType: payload})
    default:
      return state
  }
}
