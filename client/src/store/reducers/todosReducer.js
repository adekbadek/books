// @flow

import type { Action, TodosState } from 'utils/types'

import { merge, assoc, findIndex, propEq, lensPath, over } from 'ramda'

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
    case 'TODOS_UPDATE':
      const todoIndex = findIndex(propEq('id', payload.id), state.todos)
      return over(
        lensPath(['todos', todoIndex]),
        assoc('isBeingUpdated', true),
        state
      )
    case 'FLUSH_STORE':
      return initialState
    default:
      return state
  }
}
