// @flow

import type { Book } from 'utils/types'

export const isCurrent = (book: Book) => book.start_date && !book.end_date
export const isRead = (book: Book) => book.start_date && book.end_date
export const isToRead = (book: Book) => !book.start_date && !book.end_date

export const FILTERS = {
  CURRENT: {
    label: 'current',
    predicate: isCurrent,
  },
  READ: {
    label: 'read',
    predicate: isRead,
  },
  TO_READ: {
    label: 'to read',
    predicate: isToRead,
  },
  ALL: {
    label: 'all',
    predicate: (book: Book) => (book: Book),
  },
}

export const FILTER_NAMES = Object.keys(FILTERS)
