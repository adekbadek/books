import { combineReducers } from 'redux'

import ui from 'store/reducers/uiReducer'
import user from 'store/reducers/userReducer'

export default combineReducers({
  ui,
  user,
})
