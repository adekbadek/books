import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import { buttonClasses } from 'utils/styling.js'

const FlashMessage = props =>
  props.message && (
    <div
      className={cx(
        'pa2 flash-message',
        {[`flash-message--${props.message.modifier}`]: props.message.modifier}
      )}
    >
      {props.message.text}
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
