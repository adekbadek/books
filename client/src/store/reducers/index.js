import { combineReducers } from 'redux'

import ui from 'store/reducers/uiReducer'
import user from 'store/reducers/userReducer'
import books from 'store/reducers/booksReducer'

export default combineReducers({
  ui,
  books,
  user,
})
