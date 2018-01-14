// @flow

import type { User, Action } from 'utils/types'

import { merge } from 'ramda'

type State = User | {}

export default (state: State = {}, action: Action): State => {
  const {payload} = action
  switch (action.type) {
    case 'SET_USER_DATA':
      return merge(state, payload)
    default:
      return state
  }
}
