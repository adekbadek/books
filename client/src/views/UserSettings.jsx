// @flow

import React from 'react'

import { connect } from 'react-redux'

export default connect(
  state => ({user: state.user}),
)(({user}) =>
  <div>settings for {user.email}</div>
)
