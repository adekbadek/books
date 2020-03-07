// @flow

import moment from 'moment'

import {
  getRangesForDate,
  getPointNames,
} from 'utils/time.js'
import {
  times,
  hashCode,
  getAllReps,
  getColorFromStringFunc,
  getCellStyles,
} from 'utils/aux.js'

it('getRangesForDate', () => {
  const range = {start: '2017-05-01', end: '2017-05-19', name: 'Zumbo'}
  expect(
    getRangesForDate(moment('2017-05-09'), [range])
  ).toBeTruthy()
  expect(
    getRangesForDate(moment('2017-04-09'), [range])
  ).toEqual([])
  expect(
    getRangesForDate(moment('2016-05-09'), [range])
  ).toEqual([])
})

it('getPointNames', () => {
  const date1 = '2017-11-22'
  const point1 = {
    name: 'Zumbo',
    dates: [date1],
  }
  const point2 = {
    name: 'Groucho',
    dates: ['1991-02-23'],
  }
  const result = getPointNames(moment(date1), [point1])
  expect(result).toContain(point1.name)
  expect(result).not.toContain(point2.name)
  expect(getPointNames(moment(), [])).toEqual([])
})

it('times', () => {
  expect(times(3)).toEqual([undefined, undefined, undefined])
})

it('hashCode', () => {
  expect(hashCode('')).toEqual(0)
  expect(hashCode('Hello')).toEqual(69609650)
})

it('getColorFromStringFunc', () => {
  const str = 'Zumbo'
  expect(getColorFromStringFunc(str)).toEqual('rgb(43, 24, 63)')
  expect(getColorFromStringFunc(str, '#0000ff')).toEqual('rgb(22, 12, 159)')
})

it('getAllReps', () => {
  const title1 = 'One'
  const bookId1 = 42
  const title2 = 'Two'
  const rep1 = '2018-04-06'
  const rep2 = '2017-04-06'
  const rep3 = '2016-04-06'
  const books = [
    {
      id: bookId1,
      title: title1,
      reps: [rep1],
    },
    {
      id: 1,
      title: title2,
      reps: [rep2, rep3],
    },
    {
      id: 2,
      title: 'Three',
      reps: [],
    },
  ]
  const result = getAllReps(books)
  expect(result.length).toEqual(3)
  expect(result).toContainEqual({bookId: bookId1, title: title1, date: rep1})
  expect(result.filter(v => v.title === title2).length).toEqual(books[1].reps.length)
})

it('getCellStyles', () => {
  const ranges = [
    {name: 'One'},
    {name: 'Two'},
  ]
  const names = [
    'Some',
    'Names',
    'Here,',
  ]
  expect(getCellStyles(ranges, names)).toMatchSnapshot()
  expect(getCellStyles(ranges.map(v => ({...v, isOnHold: true})), names)).toMatchSnapshot()
})
