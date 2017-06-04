export const isCurrent = book => book.start_date && !book.end_date
export const isRead = book => book.start_date && book.end_date
export const isToRead = book => !book.start_date && !book.end_date

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
    predicate: book => book,
  },
}

export const FILTER_NAMES = Object.keys(FILTERS)
