// @flow

import React from 'react'

import RouteLink from 'components/RouteLink'
import { displayBookTitle } from 'utils/aux'
import { getBookViewUrl } from 'utils/api'

const BookLink = ({ book, ...props }) => (
  <RouteLink url={getBookViewUrl(book.id)} {...props}>
    {displayBookTitle(book.title)}
  </RouteLink>
)

export default BookLink
