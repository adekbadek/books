// @flow

import React from 'react'
import cx from 'classnames'

const Button = ({
  className,
  isWithoutBorder,
  isActive,
  isLarge,
  as = 'button',
  ...props
}) => {
  const Component = `${as}`
  return (
    <Component
      className={cx(className, 'bg-transparent pointer br2', {
        'button--active': isActive,
        'ba b--black pv1 ph2': !isWithoutBorder,
        'ph3 pv2': isLarge,
      })}
      {...props}
    />
  )
}

export default Button
