// @flow

import type { User } from 'utils/types'

import React from 'react'

import withUserInfo from 'components/hoc/withUserInfo'

@withUserInfo
export default class UserSettings extends React.Component {
  props: {
    user: User,
  }
  render () {
    return (
      <div>settings for {this.props.user.email}</div>
    )
  }
}
