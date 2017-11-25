// @flow

export const PROD_API_URL = 'https://books-api.adamboro.com'
export const API_VERSION = 'v1'

export const COLOR = '#00ff00'

export const MAX_TITLE_LEN = 35

export const TABLE_STRUCTURE = {
  title: {
    header: 'Title',
    col: {component: 'title'},
  },
  start: {
    header: 'Start',
    col: {component: 'date', prop: 'start_date'},
  },
  onHold: {
    header: 'On Hold',
    col: {component: 'date', prop: 'on_hold'},
  },
  end: {
    header: 'Finished',
    col: {component: 'date', prop: 'end_date'},
  },
  reps: {
    header: 'Reps',
    col: {component: 'reps'},
  },
  actions: {
    header: 'Actions',
    col: {component: 'actions'},
  },
}

export const FILTERS_TABLE_OMISSIONS = {
  CURRENT: ['reps'],
  READ: ['onHold'],
  ON_HOLD: ['end', 'reps'],
  TO_READ: ['onHold', 'end', 'reps'],
}
