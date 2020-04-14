// @flow

import React, { Fragment } from 'react'
import cx from 'classnames'

const Input = ({ className, label, onChange, ...props }) => {
  const handleOnChange = ({ target }: SyntheticInputEvent) => {
    onChange(target.value)
  }
  return (
    <Fragment>
      {label && <label className='db fw6 lh-copy f6'>{label}</label>}
      <input
        className={cx(className, 'pa1 pl2 br1')}
        type='text'
        onChange={handleOnChange}
        {...props}
      />
    </Fragment>
  )
}

export default Input
