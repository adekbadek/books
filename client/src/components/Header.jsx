// @flow

import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'ramda'

import RouteLink from 'components/RouteLink'
import {
  handleLogout,
  getAuthViewURL,
  getUserSettingsViewURL,
} from 'utils/api.js'
import actions from 'store/actions'

@connect(
  state => ({user: state.user}),
  {
    getUserData: actions.getUserData,
  }
)
export default class Header extends React.Component {
  componentDidMount () {
    this.props.getUserData()
  }
  render () {
    return (
      <div className='top'>
        <RouteLink url='/'>
          <h1 className='dib mt0'>books</h1>
        </RouteLink>
        {!isEmpty(this.props.user) && <RouteLink
          url={getAuthViewURL()}
          className='fr'
          borderButton
          beforeAction={handleLogout}
        >logout</RouteLink>}
        <RouteLink
          url={getUserSettingsViewURL()}
          className='fr pa1 pr2'
        >{this.props.user.email}</RouteLink>
      </div>
    )
  }
}
