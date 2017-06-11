// @flow

import type { Book, Repetition } from 'utils/types'

export const times = (number: number) => [...Array(number)]

export const getAllReps = (books: Array<Book>): Array<Repetition> => {
  const reps = books.map(book => {
    return book.reps
      .filter(v => !!v)
      .map(date => ({
        title: book.title,
        date,
      }))
  })
  return [].concat.apply([], reps)
}

const MAX_TITLE_LEN = 35
export const displayBookTitle = (title: string) => title.length > MAX_TITLE_LEN ? `${title.substring(0, MAX_TITLE_LEN).trim()}…` : title
