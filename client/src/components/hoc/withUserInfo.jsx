import React from 'react'
import { connect } from 'react-redux'

import {
  request,
  getUserInfoURL,
} from 'utils/api.js'
import actions from 'store/actions'
const { setUserData } = actions

export default WrappedComponent => {
  @connect(
    state => ({user: state.user}),
    {setUserData}
  )
  class WithUserInfo extends React.Component {
    getCurrentUser = () => {
      request({
        url: getUserInfoURL(),
      })
        .then(res => res.json())
        .then(this.props.setUserData)
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
