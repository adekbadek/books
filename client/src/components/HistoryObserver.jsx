import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class HistoryObserver extends React.Component {
  constructor (props) {
    super(props)
    this.props.history.listen((location, action) => {
      this.props.resetFlashMessage()
    })
  }
  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetFlashMessage: () => {
      dispatch({type: 'SET_FLASH_MESSAGE', message: null})
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(HistoryObserver))
