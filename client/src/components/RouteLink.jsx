// @flow

import React, { Children } from 'react'
import { Route } from 'react-router-dom'

import { buttonClasses, borderButtonClasses } from 'utils/styling.js'

type RouteLinkProps = {
  url: string,
  className: string,
  children: Children,
  beforeAction?: () => void,
}

export default (props: RouteLinkProps) =>
  <Route render={({history}) => (
    <button
      className={`${props.className} ${props.borderButton ? borderButtonClasses : buttonClasses}`}
      onClick={() => {
        props.beforeAction && props.beforeAction()
        history.push(props.url)
      }}
    >
      {props.children}
    </button>
  )} />
