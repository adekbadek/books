// @flow

import type { Book } from 'utils/types'

import store from 'store'
import actions from 'store/actions'
const { setLoaderState } = actions

const LOCAL_STORAGE_ITEM = 'JWT'

export const saveCredentials = (token: string) => localStorage.setItem(LOCAL_STORAGE_ITEM, token)

export const readCredentials = (): any => localStorage.getItem(LOCAL_STORAGE_ITEM)

export const revokeCredentials = () => localStorage.removeItem(LOCAL_STORAGE_ITEM)

export const request = ({url, method = 'GET', data} : {url: string, method: string, data: any}) => {
  method === 'GET' && store.dispatch(setLoaderState(true))

  const conf = {
    method,
    headers: {
      'Authorization': readCredentials(),
    },
    body: data ? JSON.stringify(data) : null,
  }

  return fetch(url, conf).then(v => {
    method === 'GET' && store.dispatch(setLoaderState(null))
    return v
  })
}

const isProduction = process.env.NODE_ENV === 'production'

// URLs
export const getRootViewURL = () => '/'
export const getAuthViewURL = () => '/auth'
export const getUserSettingsViewURL = () => '/settings'

const PROD_API_URL = 'https://books-api.adamboro.com'

const getURL = endpoint => `${isProduction ? PROD_API_URL : ''}${endpoint}`

export const getBooksURL = (id: $PropertyType<Book, 'id'>) => getURL(`/api/books${id ? `/${id}` : ''}`)
export const getAuthenticateURL = () => getURL(`/authenticate`)
export const getSignupURL = () => getURL(`/signup`)
export const getUserInfoURL = () => getURL(`/user`)
