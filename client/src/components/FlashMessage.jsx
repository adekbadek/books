// @flow

import type { FlashMessageObject, ActionFunction } from 'utils/types'

import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import { borderButtonClasses } from 'utils/styling.js'
import actions from 'store/actions'
const { setFlashMessage } = actions

type FlashMessageProps = {
  message: FlashMessageObject,
  setFlashMessage: ActionFunction,
}

const FlashMessage = (props: FlashMessageProps) =>
  props.message ? (
    <div
      className={cx(
        'pa2 flash-message flex flex--spread',
        {[`flash-message--${props.message.modifier}`]: props.message.modifier}
      )}
    >
      {props.message.text}
      <button
        className={`fr ${borderButtonClasses}`}
        onClick={() => props.setFlashMessage(false)}
      >close</button>
    </div>
  ) : null

const mapStateToProps = state => ({
  message: state.ui.message
})

export default connect(
  mapStateToProps,
  {setFlashMessage}
)(FlashMessage)
