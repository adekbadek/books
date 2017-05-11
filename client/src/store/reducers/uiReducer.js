const initialState = {
  message: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FLASH_MESSAGE':
      return Object.assign({}, state, {message: action.message})
    default:
      return state
  }
}
