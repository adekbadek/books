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
    <div className='flex justify-between items-start mb3 mb5-ns flex-wrap'>
      <div className='flex items-center justify-between w-100 mb2'>
        <RouteLink url={USER_SETTINGS_VIEW_URL} className='mr3'>
          {user.email}
        </RouteLink>
        {!isEmpty(user) && (
          <RouteLink
            url={AUTH_VIEW_URL}
            isWithoutBorder={false}
            beforeAction={handleLogout}
          >
            logout
          </RouteLink>
        )}
      </div>
      <RouteLink url='/'>
        <h1 className='f1 dib ma0'>books</h1>
      </RouteLink>
    </div>
  )
}

export default Header
