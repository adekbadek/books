export const setFlashMessage = message => ({
  type: 'SET_FLASH_MESSAGE',
  payload: {
    message,
  },
})

export const setLoaderState = displayLoader => ({
  type: 'SET_LOADER_STATE',
  payload: {
    displayLoader,
  },
})
