// @flow

import React from 'react'
import Loadable from 'react-loadable'

import { Loader } from 'components/Loader'

const Loading = ({ isLoading, pastDelay, error }) => {
  if (isLoading && pastDelay) {
    return <Loader show />
  } else if (error && !isLoading) {
    return <p>Error!</p>
  } else {
    return null
  }
}

const AsyncLoaded = opts => Loadable({
  LoadingComponent: Loading,
  ...opts
})

const LoadableMain = AsyncLoaded({
  loader: () => import(/* webpackChunkName: 'Main' */ 'views/Main.jsx')
})

const LoadableBook = AsyncLoaded({
  loader: () => import(/* webpackChunkName: 'Main' */ 'views/Book.jsx')
})

const LoadableAuth = AsyncLoaded({
  loader: () => import(/* webpackChunkName: 'Auth' */ 'views/Auth.jsx')
})

const LoadableUserSettings = AsyncLoaded({
  loader: () => import(/* webpackChunkName: 'UserSettings' */ 'views/UserSettings.jsx')
})

export const AsyncMain = () => <LoadableMain />
export const AsyncBook = ({match: {params: {id}}}) => <LoadableBook bookId={id} />
export const AsyncAuth = () => <LoadableAuth />
export const AsyncUserSettings = () => <LoadableUserSettings />
