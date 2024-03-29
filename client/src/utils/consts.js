// @flow

export const PROD_API_URL = 'https://books-api.adamcassis.com'
export const API_VERSION = 'v1'

export const COLOR = '#00ff00'

export const MAX_TITLE_LEN = 35

export const TABLE_STRUCTURE = {
  title: {
    header: 'Title',
    col: { component: 'title' },
  },
  author: {
    header: 'Author',
    col: { component: 'author' },
  },
  start: {
    header: 'Start',
    col: { component: 'date', prop: 'start_date' },
  },
  end: {
    header: 'Finished',
    col: { component: 'date', prop: 'end_date|on_hold' },
  },
}

export const FILTERS_TABLE_OMISSIONS = {
  CURRENT: [],
  ON_HOLD: [],
  READ: [],
  TO_READ: ['start', 'end'],
}
