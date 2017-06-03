const actionCreator = type => payload => ({type, payload})

export default {
  setFlashMessage: actionCreator('SET_FLASH_MESSAGE'),
  setLoaderState: actionCreator('SET_LOADER_STATE'),
  setUserData: actionCreator('SET_USER_DATA'),
  setBooks: actionCreator('SET_BOOKS'),
  setFilterInput: actionCreator('SET_FILTER_INPUT'),
  setFilterType: actionCreator('SET_FILTER_TYPE'),
}
