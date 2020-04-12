// @flow

import type Moment from 'moment'
import type { Range, CalendarPoint } from 'utils/types'
import { pluck } from 'ramda'
import moment from 'moment'

export const DATE_FORMAT = 'DD MMM YYYY'

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})

export const getRangesForDate = (date: Moment, ranges: Array<Range>) => {
  return ranges.filter(range => {
    return (
      range.start &&
      range.end &&
      date.isBetween(range.start, range.end, '', '[]')
    )
  })
}

export const getPointNames = (date: Moment, points: Array<CalendarPoint>) => {
  const pointsInDate = points
    .filter(point => !!point.dates.filter(v => date.isSame(v)).length)
    // just to satisfy flow defn of pluck 😕
    .map(({ name }) => ({ name }))
  return pluck('name', pointsInDate)
}
