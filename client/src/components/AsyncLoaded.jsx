import React from 'react'
import Loadable from 'react-loadable'

const Loading = ({ isLoading, pastDelay, error }) => {
  if (isLoading && pastDelay) {
    return <p>Loading...</p>
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

const LoadableAuth = AsyncLoaded({
  loader: () => import(/* webpackChunkName: 'Auth' */ 'views/Auth.jsx')
})

const LoadableUserSettings = AsyncLoaded({
  loader: () => import(/* webpackChunkName: 'UserSettings' */ 'views/UserSettings.jsx')
})

export const AsyncMain = () => <LoadableMain />
export const AsyncAuth = () => <LoadableAuth />
export const AsyncUserSettings = () => <LoadableUserSettings />
