// @flow

import React, { Children } from 'react'
import { Route } from 'react-router-dom'
import cx from 'classnames'

import { buttonClasses, borderButtonClasses } from 'utils/styling.js'

type RouteLinkProps = {
  url: string,
  children: Children,
  className?: string,
  beforeAction?: () => void,
}

export default (props: RouteLinkProps) => {
  const onClick = history => e => {
    e.preventDefault()
    props.beforeAction && props.beforeAction()
    history.push(props.url)
  }
  return (
    <Route
      render={({ history }) => (
        <a
          className={cx(
            props.className,
            props.borderButton ? borderButtonClasses : buttonClasses
          )}
          href={props.url}
          onClick={onClick(history)}
        >
          {props.children}
        </a>
      )}
    />
  )
}
