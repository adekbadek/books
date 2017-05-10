import moment from 'moment'

import { getRangesForDate } from '../utils/time.js'

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
