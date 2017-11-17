// @flow

import type { Action, MainState } from 'utils/types'

import { merge } from 'ramda'

import { FILTER_NAMES } from 'utils/filters.js'

const initialState = {
  books: [],
  filterType: FILTER_NAMES[0],
}

export default (state: MainState = initialState, action: Action): MainState => {
  const {payload} = action
  switch (action.type) {
    case 'SET_BOOKS':
      return merge(state, {...payload})
    case 'SET_FILTER_INPUT':
      return merge(state, {filterInput: payload})
    case 'SET_FILTER_TYPE':
      return merge(state, {filterType: payload})
    default:
      return state
  }
}
