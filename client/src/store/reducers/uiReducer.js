const initialState = {
  message: null,
  displayLoader: null,
}

export default (state = initialState, action) => {
  const {payload} = action
  switch (action.type) {
    case 'SET_FLASH_MESSAGE':
      return Object.assign({}, state, {message: payload})
    case 'SET_LOADER_STATE':
      return Object.assign({}, state, {displayLoader: payload})
    default:
      return state
  }
}
