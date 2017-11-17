// @flow

import type { User, ActionFunction } from 'utils/types'

import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'ramda'

import {
  request,
  getUserInfoURL,
} from 'utils/api.js'
import actions from 'store/actions'
const { setUserData } = actions

export default (WrappedComponent: () => any) => {
  @connect(
    state => ({user: state.user}),
    {setUserData}
  )
  class WithUserInfo extends React.Component {
    props: {
      user: User,
      setUserData: ActionFunction,
    }
    getCurrentUser = () => {
      if (isEmpty(this.props.user)) {
        request({url: getUserInfoURL()})
          .then(this.props.setUserData)
      }
    }
    componentDidMount () {
      this.getCurrentUser()
    }
    render () {
      return <WrappedComponent user={this.props.user} {...this.props} />
    }
  }
  return WithUserInfo
}
