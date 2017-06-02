import React from 'react'
import { Route } from 'react-router-dom'

import { buttonClasses, borderButtonClasses } from 'utils/styling.js'

export default props =>
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
