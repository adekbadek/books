import React from 'react'
import { Route } from 'react-router-dom'

import { buttonClasses } from 'utils/styling.js'

export default props =>
  <Route render={({history}) => (
    <button
      className={`${props.className} ${buttonClasses}`}
      onClick={() => {
        props.beforeAction && props.beforeAction()
        history.push(props.url)
      }}
    >
      {props.children}
    </button>
  )} />
