// @flow

import React from 'react'

import withUserInfo from 'components/hoc/withUserInfo'

@withUserInfo
export default class UserSettings extends React.Component {
  render () {
    return (
      <div>settings for {this.props.user.email}</div>
    )
  }
}
