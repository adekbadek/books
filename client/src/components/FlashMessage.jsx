import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import { borderButtonClasses } from 'utils/styling.js'
import actions from 'store/actions'
const { setFlashMessage } = actions

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
        className={`fr ${borderButtonClasses}`}
        onClick={() => props.setFlashMessage(null)}
      >close</button>
    </div>
  )

const mapStateToProps = (state) => ({
  message: state.ui.message
})

export default connect(
  mapStateToProps,
  {setFlashMessage}
)(FlashMessage)
