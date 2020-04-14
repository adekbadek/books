// @flow

import type { FlashMessageObject, ActionFunction } from 'utils/types'

import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import Button from 'components/Button'
import actions from 'store/actions'
const { setFlashMessage } = actions

type FlashMessageProps = {
  message: FlashMessageObject,
  setFlashMessage: ActionFunction,
}

const FlashMessage = (props: FlashMessageProps) =>
  props.message ? (
    <div
      className={cx('flash-message', {
        [`flash-message--${props.message.modifier}`]: props.message.modifier,
      })}
    >
      <div className='pv2 ph4 mw8 m-auto  flex flex--spread'>
        {props.message.text}
        <Button className='fr' onClick={() => props.setFlashMessage(false)}>
          close
        </Button>
      </div>
    </div>
  ) : null

const mapStateToProps = state => ({
  message: state.ui.message,
})

export default connect(mapStateToProps, { setFlashMessage })(FlashMessage)
