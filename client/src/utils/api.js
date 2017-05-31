import store from 'store'
import actions from 'store/actions'
const { setLoaderState } = actions

const LOCAL_STORAGE_ITEM = 'JWT'

export const saveCredentials = token => localStorage.setItem(LOCAL_STORAGE_ITEM, token)

export const readCredentials = () => localStorage.getItem(LOCAL_STORAGE_ITEM)

export const revokeCredentials = () => localStorage.removeItem(LOCAL_STORAGE_ITEM)

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

const isProduction = process.env.NODE_ENV === 'production'

// URLs
export const getRootViewURL = () => '/'
export const getAuthViewURL = () => '/auth'

const PROD_API_URL = 'https://books-api.adamboro.com'

export const getBooksURL = id => (
  `${isProduction ? PROD_API_URL : ''}/api/books${id ? `/${id}` : ''}`
)
export const getAuthenticateURL = () => (
  `${isProduction ? PROD_API_URL : ''}/authenticate`
)
export const getSignupURL = () => (
  `${isProduction ? PROD_API_URL : ''}/signup`
)
