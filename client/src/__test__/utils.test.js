import moment from 'moment'

import { getRangesForDate } from 'utils/time.js'
import { getColorFromStringFunc } from 'utils/aux.js'

it('getRangesForDate', () => {
  expect(
    getRangesForDate(moment('2017-05-09'), [{start: '2017-05-01', end: '2017-05-19'}])
  ).toBeTruthy()
  expect(
    getRangesForDate(moment('2017-04-09'), [{start: '2017-05-01', end: '2017-05-19'}])
  ).toEqual([])
  expect(
    getRangesForDate(moment('2016-05-09'), [{start: '2017-05-01', end: '2017-05-19'}])
  ).toEqual([])
})

it('getColorFromStringFunc', () => {
  const str = 'Zumbo'
  expect(getColorFromStringFunc(str)).toEqual('rgb(43, 24, 63)')
  expect(getColorFromStringFunc(str, '#0000ff')).toEqual('rgb(22, 12, 159)')
})
