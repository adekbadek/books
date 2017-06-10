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

let LoadableMain = Loadable({
  loader: () => import(/* webpackChunkName: 'Main' */ './Main.jsx'),
  LoadingComponent: Loading,
})

export default function AsyncMain () {
  return (
    <LoadableMain />
  )
}
