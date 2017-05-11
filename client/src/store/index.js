import { createStore } from 'redux'

import reducerApp from 'store/reducers'

export default createStore(
  reducerApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
