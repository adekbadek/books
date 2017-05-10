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
