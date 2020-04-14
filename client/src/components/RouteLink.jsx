// @flow

import React, { Children } from 'react'
import { Route } from 'react-router-dom'

import Button from 'components/Button'

type RouteLinkProps = {
  url: string,
  children: Children,
  className?: string,
  beforeAction?: () => void,
}

const RouteLink = ({ beforeAction, url, ...props }: RouteLinkProps) => {
  const onClick = history => e => {
    e.preventDefault()
    beforeAction && beforeAction()
    history.push(url)
  }
  return (
    <Route
      render={({ history }) => (
        <Button
          as='a'
          isWithoutBorder
          href={url}
          onClick={onClick(history)}
          {...props}
        />
      )}
    />
  )
}

export default RouteLink
