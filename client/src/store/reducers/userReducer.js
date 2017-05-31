export default (state = {}, action) => {
  const {payload} = action
  switch (action.type) {
    case 'SET_USER_DATA':
      return Object.assign({}, state, {...payload})
    default:
      return state
  }
}
