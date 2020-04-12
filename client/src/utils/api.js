// @flow

import type { Book, Todo, AuthFormFields } from 'utils/types'

import store from 'store'
import actions from 'store/actions'
import history from 'utils/history'
import { PROD_API_URL, API_VERSION } from 'utils/consts'

const { setLoaderState, flushStore } = actions

const LOCAL_STORAGE_ITEM = 'JWT'

const isProduction = process.env.NODE_ENV === 'production'

// views URLs
export const ROOT_VIEW_URL = '/'
export const BOOK_VIEW_URL = '/book/:id'
export const getBookViewUrl = id => `/book/${id}`
export const AUTH_VIEW_URL = '/login'
export const USER_SETTINGS_VIEW_URL = '/settings'

// API URLs
const getURL = endpoint =>
  `${isProduction ? PROD_API_URL : ''}/${API_VERSION}${endpoint}`

export const getBooksURL = (id?: $PropertyType<Book, 'id'>) =>
  getURL(`/books${id ? `/${id}` : ''}`)
export const getTodosURL = (id?: $PropertyType<Todo, 'id'>) =>
  getURL(`/todos${id ? `/${id}` : ''}`)
export const getAuthenticateURL = () => getURL(`/authenticate`)
export const getSignupURL = () => getURL(`/signup`)
export const getUserInfoURL = () => getURL(`/user`)

export const saveCredentials = (token: string): void =>
  localStorage.setItem(LOCAL_STORAGE_ITEM, token)
export const readCredentials = (): any =>
  localStorage.getItem(LOCAL_STORAGE_ITEM)
const revokeCredentials = (): void =>
  localStorage.removeItem(LOCAL_STORAGE_ITEM)

export const handleLogout = (): void => {
  revokeCredentials()
  store.dispatch(flushStore())
}

export const request = ({
  url,
  method = 'GET',
  data,
}: {
  url: string,
  method?: string,
  data?: any,
}): Promise<*> =>
  new Promise((resolve, reject) => {
    method === 'GET' && store.dispatch(setLoaderState(true))

    const CONFIG = {
      method,
      headers: {
        Authorization: readCredentials(),
      },
      body: data ? JSON.stringify(data) : null,
    }

    fetch(url, CONFIG).then(res => {
      method === 'GET' && store.dispatch(setLoaderState(null))
      if (res.status >= 400) {
        if (res.status === 401) {
          revokeCredentials()
          history.push(AUTH_VIEW_URL)
          setTimeout(() => {
            store.dispatch(actions.setFlashMessage({ text: 'please log in' }))
          }, 1)
        } else {
          reject(res)
        }
      } else {
        resolve(res.json())
      }
    })
  })

export const authFetch = (url: string, fields: AuthFormFields): Promise<*> => {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fields),
  })
}

export const serializeMessage = (object: {}): string => {
  return Object.keys(object)
    .map(key => {
      return `${key}: ${object[key].join(', ')}`
    })
    .join(' // ')
}
