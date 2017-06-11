// @flow

import type { ActionFunction } from 'utils/types'

import React, { Children } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import actions from 'store/actions'
const { setFlashMessage } = actions

type HistoryObserverProps = {
  history: any,
  setFlashMessage: ActionFunction,
  children: Children,
}

@withRouter
@connect(
  null,
  {setFlashMessage}
)
export default class HistoryObserver extends React.Component {
  constructor (props: HistoryObserverProps) {
    super(props)
    this.props.history.listen((location, action) => {
      this.props.setFlashMessage(false)
    })
  }
  render () {
    return <div>{this.props.children}</div>
  }
}
