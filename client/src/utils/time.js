export const DATE_FORMAT = 'DD MMM YYYY'

// TODO: refactor?

export const getRangesForDate = (date, ranges) => {
  let rangeNames = []
  ranges.map(range => {
    const is = range.start && range.end && date.isBetween(range.start, range.end, null, '[]')
    if (is) {
      rangeNames.push(range.name)
    }
    return is
  })
  return rangeNames
}
