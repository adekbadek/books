export const FILTERS = {
  CURRENT: {
    label: 'current',
    predicate: book => book.start_date && !book.end_date,
  },
  READ: {
    label: 'read',
    predicate: book => book.start_date && book.end_date,
  },
  TO_READ: {
    label: 'to read',
    predicate: book => !book.start_date && !book.end_date,
  },
  ALL: {
    label: 'all',
    predicate: book => book,
  },
}

export const FILTER_NAMES = Object.keys(FILTERS)
