import { FILTER_NAMES } from 'utils/aux.js'

const initialState = {
  filterType: FILTER_NAMES[0]
}

export default (state = initialState, action) => {
  const {payload} = action
  switch (action.type) {
    case 'SET_FILTER_INPUT':
      return Object.assign({}, state, {filterInput: payload})
    case 'SET_FILTER_TYPE':
      return Object.assign({}, state, {filterType: payload})
    default:
      return state
  }
}
