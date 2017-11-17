// @flow

import { createBrowserHistory } from 'history'

import store from 'store'
import actions from 'store/actions'

const history = createBrowserHistory()

history.listen((location, action) => {
  store.dispatch(actions.setFlashMessage(false))
})

export default history
