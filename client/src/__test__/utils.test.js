import moment from 'moment'

import { isDateInRange } from '../utils/time.js'

it('isDateInRange', () => {
  expect(
    isDateInRange(moment('2017-05-09'), [{start: '2017-05-01', end: '2017-05-19'}])
  ).toBeTruthy()
  expect(
    isDateInRange(moment('2017-04-09'), [{start: '2017-05-01', end: '2017-05-19'}])
  ).not.toBeTruthy()
  expect(
    isDateInRange(moment('2016-05-09'), [{start: '2017-05-01', end: '2017-05-19'}])
  ).not.toBeTruthy()
})
