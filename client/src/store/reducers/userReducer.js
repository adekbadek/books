// @flow

import type { User, Action } from 'utils/types'

import { merge } from 'ramda'

type State = User | {}

const initialState = {}

export default (state: State = initialState, action: Action): State => {
  const { payload } = action
  switch (action.type) {
    case 'SET_USER_DATA':
      return merge(state, payload)
    case 'FLUSH_STORE':
      return initialState
    default:
      return state
  }
}
