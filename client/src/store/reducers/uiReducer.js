// @flow

import type { Action } from 'utils/types'

import { merge } from 'ramda'

import { FILTER_NAMES } from 'utils/filters.js'

type State = {
  +message: string | null,
  +displayLoader: boolean | null,
  +filterType: string,
  +filterInput?: string,
}

const initialState = {
  message: null,
  displayLoader: null,
  filterType: FILTER_NAMES[0],
}

export default (state: State = initialState, action: Action): State => {
  const {payload} = action
  switch (action.type) {
    case 'SET_FLASH_MESSAGE':
      return merge(state, {message: payload})
    case 'SET_LOADER_STATE':
      return merge(state, {displayLoader: payload})
    case 'SET_FILTER_INPUT':
      return merge(state, {filterInput: payload})
    case 'SET_FILTER_TYPE':
      return merge(state, {filterType: payload})
    default:
      return state
  }
}
