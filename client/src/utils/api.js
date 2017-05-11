import { readCredentials } from 'utils/auth'

export const request = ({url, method, data}) => {
  const conf = {
    method: method || 'GET',
    headers: {
      'Authorization': readCredentials(),
    }
  }
  if (method !== 'GET' && data) {
    conf.body = JSON.stringify(data)
  }
  return fetch(url, conf)
}
