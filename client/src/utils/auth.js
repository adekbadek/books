const LOCAL_STOREGE_ITEM = 'JWT'

export const saveCredentials = token => localStorage.setItem(LOCAL_STOREGE_ITEM, token)

export const readCredentials = () => localStorage.getItem(LOCAL_STOREGE_ITEM)

export const revokeCredentials = () => localStorage.removeItem(LOCAL_STOREGE_ITEM)
