export const times = number => [...Array(number)]

const NUMBER_OF_REPS = 3

export const getRepDates = book => times(NUMBER_OF_REPS).map((_, i) => book[`rep_${i + 1}`])

export const getAllReps = books => {
  const reps = books.map(book => {
    return getRepDates(book)
      .filter(v => !!v)
      .map(date => {
        return {
          title: book.title,
          date,
        }
      })
  })
  return [].concat.apply([], reps)
}

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
