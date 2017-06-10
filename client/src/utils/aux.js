// @flow

import type { Book } from 'utils/types'

export const times = (number: number) => [...Array(number)]

const NUMBER_OF_REPS = 3

export const getRepDates = (book: Book): Array<string> => times(NUMBER_OF_REPS).map((_, i) => book[`rep_${i + 1}`])

export const getAllReps = (books: Array<Book>): Array<{title: string, date: string}> => {
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

const MAX_TITLE_LEN = 35
export const displayBookTitle = (title: string) => title.length > MAX_TITLE_LEN ? `${title.substring(0, MAX_TITLE_LEN).trim()}…` : title
