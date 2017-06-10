// @flow

import type moment from 'moment'
import type { Range } from 'utils/types'

export const DATE_FORMAT = 'DD MMM YYYY'

// TODO: refactor?

export const getRangesForDate = (date: moment, ranges: Array<Range>) => {
  let rangeNames = []
  ranges.map(range => {
    const is = range.start && range.end && date.isBetween(range.start, range.end, '', '[]')
    if (is) {
      rangeNames.push(range.name)
    }
    return is
  })
  return rangeNames
}
