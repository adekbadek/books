const initialState = {
  message: null,
  displayLoader: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FLASH_MESSAGE':
      return Object.assign({}, state, {message: action.message})
    case 'SET_LOADER_STATE':
      return Object.assign({}, state, {displayLoader: action.displayLoader})
    default:
      return state
  }
}
