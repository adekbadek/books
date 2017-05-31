import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import actions from 'store/actions'
const { setFlashMessage } = actions

@withRouter
@connect(
  null,
  {setFlashMessage}
)
export default class HistoryObserver extends React.Component {
  constructor (props) {
    super(props)
    this.props.history.listen((location, action) => {
      this.props.setFlashMessage(null)
    })
  }
  render () {
    return <div>{this.props.children}</div>
  }
}
