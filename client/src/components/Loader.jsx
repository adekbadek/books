// @flow

import React from 'react'
import { connect } from 'react-redux'

const Loader = props =>
  props.displayLoader && <div className='loader flex flex--center'>LOADING</div>

const mapStateToProps = state => ({
  displayLoader: state.ui.displayLoader
})

export default connect(
  mapStateToProps
)(Loader)
