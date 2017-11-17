// @flow

import type { Action } from 'utils/types'

import { merge } from 'ramda'

type State = {
  +message: string | null,
  +displayLoader: boolean | null,
}

const initialState = {
  message: null,
  displayLoader: null,
}

export default (state: State = initialState, action: Action): State => {
  const {payload} = action
  switch (action.type) {
    case 'SET_FLASH_MESSAGE':
      return merge(state, {message: payload})
    case 'SET_LOADER_STATE':
      return merge(state, {displayLoader: payload})
    default:
      return state
  }
}
