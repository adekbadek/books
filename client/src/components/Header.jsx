// @flow

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from 'ramda'

import RouteLink from 'components/RouteLink'
import {
  handleLogout,
  AUTH_VIEW_URL,
  USER_SETTINGS_VIEW_URL,
} from 'utils/api.js'
import actions from 'store/actions'

const Header = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getUserData())
  }, [])

  return (
    <div className='top'>
      <RouteLink url='/'>
        <h1 className='dib mt0'>books</h1>
      </RouteLink>
      {!isEmpty(user) && (
        <RouteLink
          url={AUTH_VIEW_URL}
          className='fr'
          borderButton
          beforeAction={handleLogout}
        >
          logout
        </RouteLink>
      )}
      <RouteLink url={USER_SETTINGS_VIEW_URL} className='fr pa1 pr2'>
        {user.email}
      </RouteLink>
    </div>
  )
}

export default Header
