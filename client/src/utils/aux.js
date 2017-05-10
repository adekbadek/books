export const times = number => [...Array(number)]

const NUMBER_OF_REPS = 3

export const getRepDates = book => times(NUMBER_OF_REPS).map((_, i) => book[`rep_${i + 1}`])
