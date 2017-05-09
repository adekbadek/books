export const DATE_FORMAT = 'DD MMM YYYY'

export const isDateInRange = (date, ranges) => {
  return !!ranges.filter(range => {
    return range.start && range.end && date.isBetween(range.start, range.end, null, '[]')
  }).length
}
