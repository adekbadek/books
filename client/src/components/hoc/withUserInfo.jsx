// @flow

import type { User } from 'utils/types'

import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'ramda'

import actions from 'store/actions'

/**
 * HOC that fetches (if necessary) the current user and provides their data via a prop.
 */
export default (WrappedComponent: () => any) => {
  @connect(
    state => ({user: state.user}),
    {
      getUserData: actions.getUserData,
    }
  )
  class WithUserInfo extends React.Component {
    props: {
      user: User,
      getUserData: () => void,
    }
    componentDidMount () {
      isEmpty(this.props.user) && this.props.getUserData()
    }
    render () {
      return <WrappedComponent user={this.props.user} {...this.props} />
    }
  }
  return WithUserInfo
}
