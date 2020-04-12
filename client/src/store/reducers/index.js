// @flow

import { combineReducers } from 'redux'

import ui from 'store/reducers/uiReducer'
import user from 'store/reducers/userReducer'
import books from 'store/reducers/booksReducer'
import todos from 'store/reducers/todosReducer'

export default combineReducers({
  ui,
  books,
  user,
  todos,
})
