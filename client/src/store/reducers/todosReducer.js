// @flow

import type { Action, TodosState } from 'utils/types'

import { merge } from 'ramda'

const initialState = {
  todos: [],
}

export default (
  state: TodosState = initialState,
  action: Action
): TodosState => {
  const { payload } = action
  switch (action.type) {
    case 'SET_TODOS':
      return merge(state, { ...payload })
    case 'FLUSH_STORE':
      return initialState
    default:
      return state
  }
}
