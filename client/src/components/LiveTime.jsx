// @flow

import React, { useEffect, useState } from 'react'
import cx from 'classnames'

const HOUR = 1000 * 60 * 60

/**
 * A Component that self-updates evey hour.
 */
const LiveTime = ({ children, className, getDynamicClassName, ...props }) => {
  const [dynamicChildren, setDynamicChildren] = useState(children())
  const [dynamicClassName, setDynamicClassName] = useState(
    getDynamicClassName ? getDynamicClassName() : undefined
  )
  useEffect(() => {
    const updateComponent = () => {
      setDynamicChildren(children())
      if (getDynamicClassName) {
        setDynamicClassName(getDynamicClassName())
      }
    }
    const interval = setInterval(updateComponent, HOUR)
    return () => clearInterval(interval)
  }, [])
  return (
    <div
      className={cx(className, dynamicClassName)}
      children={dynamicChildren}
      {...props}
    />
  )
}

export default LiveTime
