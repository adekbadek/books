// @flow

import type { Book } from 'utils/types'

export const FILTERS = {
  CURRENT: {
    label: 'current',
    predicate: (book: Book) => book.start_date && !book.end_date && !book.on_hold,
  },
  ON_HOLD: {
    label: 'on hold',
    predicate: (book: Book) => book.start_date && !book.end_date && book.on_hold,
  },
  READ: {
    label: 'read',
    predicate: (book: Book) => book.start_date && book.end_date && !book.on_hold,
  },
  TO_READ: {
    label: 'to read',
    predicate: (book: Book) => !book.start_date && !book.end_date && !book.on_hold,
  },
  ALL: {
    label: 'all',
    predicate: (book: Book) => (book: Book),
  },
}

export const FILTER_NAMES = Object.keys(FILTERS)
