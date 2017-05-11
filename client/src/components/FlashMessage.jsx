import React from 'react'
import { connect } from 'react-redux'

import { buttonClasses } from 'utils/styling.js'

const FlashMessage = props =>
  props.message && (
    <div
      className={`pa2 flash-message`}
    >
      {props.message}
      <button
        className={`fr ${buttonClasses}`}
        onClick={props.closeFlashMessage}
      >close</button>
    </div>
  )

const mapStateToProps = (state) => {
  return {
    message: state.ui.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeFlashMessage: () => {
      dispatch({type: 'SET_FLASH_MESSAGE', message: null})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashMessage)
