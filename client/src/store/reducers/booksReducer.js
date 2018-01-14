// @flow

import type { Action, MainState } from 'utils/types'

import { merge } from 'ramda'

const initialState = {
  books: [],
}

export default (state: MainState = initialState, action: Action): MainState => {
  const {payload} = action
  switch (action.type) {
    case 'SET_BOOKS':
      return merge(state, {...payload})
    case 'FLUSH_STORE':
      return initialState
    default:
      return state
  }
}
