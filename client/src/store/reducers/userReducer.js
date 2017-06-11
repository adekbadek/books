// @flow

import type { User, Action } from 'utils/types'

type State = User | {}

export default (state: State = {}, action: Action): State => {
  const {payload} = action
  switch (action.type) {
    case 'SET_USER_DATA':
      return Object.assign({}, state, {...payload})
    default:
      return state
  }
}
