import store from 'store'
import { setLoaderState } from 'store/actions'

const LOCAL_STOREGE_ITEM = 'JWT'

export const saveCredentials = token => localStorage.setItem(LOCAL_STOREGE_ITEM, token)

export const readCredentials = () => localStorage.getItem(LOCAL_STOREGE_ITEM)

export const revokeCredentials = () => localStorage.removeItem(LOCAL_STOREGE_ITEM)

export const request = ({url, method, data}) => {
  store.dispatch(setLoaderState(true))
  const conf = {
    method: method || 'GET',
    headers: {
      'Authorization': readCredentials(),
    }
  }
  if (method !== 'GET' && data) {
    conf.body = JSON.stringify(data)
  }
  return fetch(url, conf).then(v => {
    store.dispatch(setLoaderState(null))
    return v
  })
}

// URLs
export const getRootViewURL = () => '/'
export const getAuthViewURL = () => '/auth'

export const getBooksURL = id => `/api/books${id ? `/${id}` : ''}`
export const getAuthenticateURL = () => '/authenticate'
