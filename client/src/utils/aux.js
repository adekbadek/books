// @flow

import color from 'color'

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

export const getVisibleReps = (book: Book): Array<*> => book.end_date ? book.reps : []

const MAX_TITLE_LEN = 35
export const displayBookTitle = (title: string) => title.length > MAX_TITLE_LEN ? `${title.substring(0, MAX_TITLE_LEN).trim()}…` : title

// https://stackoverflow.com/a/3426956/3772847
const hashCode = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}
const intToRGB = (i: number): string => {
  const c = (i & 0x00FFFFFF).toString(16).toUpperCase()
  return '00000'.substring(0, 6 - c.length) + c
}

export const getColorFromString = (str: string, bias?: string): string => {
  let hexColor = color(`#${intToRGB(hashCode(str))}`)
  if (bias) {
    hexColor = hexColor.mix(color(bias))
  }
  return hexColor.string()
}
