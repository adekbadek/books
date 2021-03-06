// @flow

import type { Range, Book } from 'utils/types'

import color from 'color'
import memoize from 'lodash.memoize'
import { all, values, omit, pluck } from 'ramda'

import {
  MAX_TITLE_LEN,
  TABLE_STRUCTURE,
  FILTERS_TABLE_OMISSIONS,
  COLOR,
} from 'utils/consts'
import { FILTERS } from 'utils/filters.js'

export const times = (number: number) => [...Array(number)]

export const displayBookTitle = (title: string) =>
  title.length > MAX_TITLE_LEN
    ? `${title.substring(0, MAX_TITLE_LEN).trim()}…`
    : title

// https://stackoverflow.com/a/3426956/3772847
export const hashCode = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}
const intToRGB = (i: number): string => {
  const c = (i & 0x00ffffff).toString(16).toUpperCase()
  return '00000'.substring(0, 6 - c.length) + c
}

export const getColorFromStringFunc = (str: string, bias?: string): string => {
  let hexColor = color(`#${intToRGB(hashCode(str))}`)
  if (bias) {
    hexColor = hexColor.mix(color(bias))
  }
  return hexColor.string()
}

export const getColorFromString = memoize(getColorFromStringFunc)

export const dimColor = (colorCode: string) =>
  color(colorCode).desaturate(0.85).alpha(0.5).string()

export const getHeadersAndCols = (filterType: string) => {
  const omissions = FILTERS_TABLE_OMISSIONS[filterType] || []
  const filteredValues = values(omit(omissions, TABLE_STRUCTURE))
  return {
    headers: pluck('header', filteredValues),
    cols: pluck('col', filteredValues),
  }
}

export const getCellStyles = (
  rangesData: Array<Range>,
  names: Array<string>
) => {
  if (rangesData.length > 0) {
    const areAllDimmed = all(v => !!v.isOnHold, rangesData)
    let backgroundColor = getColorFromString(names.join(), COLOR)
    if (areAllDimmed) {
      backgroundColor = dimColor(backgroundColor)
    }
    return { backgroundColor }
  } else {
    return {}
  }
}

export const filterBooksByFilterType = (
  books: Array<Book>,
  filterType: string
) => books.filter(FILTERS[filterType].predicate)

export const sortByDate = (keyName: string, isReverse: boolean = false) => (
  a: Object,
  b: Object
) => {
  const dateA = new Date(isReverse ? b[keyName] : a[keyName])
  const dateB = new Date(isReverse ? a[keyName] : b[keyName])
  return dateA < dateB ? -1 : dateA > dateB ? 1 : 0
}

export const sortRanges = sortByDate('start')
