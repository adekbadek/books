// @flow

import React from 'react'
import { connect } from 'react-redux'

import { COLOR } from 'utils/consts'

export const Loader = ({show}: {show: bool}) =>
  show ? <div className='loader flex flex--center'>
    <svg x='0px' y='0px' viewBox='0 0 100 100' width='60px' height='60px' enableBackground='new 0 0 0 0'>
      <path fill={COLOR} d='M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50'>
        <animateTransform
          attributeName='transform'
          attributeType='XML'
          type='rotate'
          dur='1s'
          from='0 50 50'
          to='360 50 50'
          repeatCount='indefinite'
        />
      </path>
    </svg>
  </div> : null

const mapStateToProps = state => ({
  show: state.ui.displayLoader,
})

export default connect(
  mapStateToProps
)(Loader)
