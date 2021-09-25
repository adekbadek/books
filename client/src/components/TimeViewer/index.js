// @flow

import React, { useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import cx from 'classnames'

import Button from 'components/Button'
import { sortRanges } from 'utils/aux.js'
import Calendar from 'components/TimeViewer/Calendar'
import Gantt from 'components/TimeViewer/Gantt'
import Icon from 'components/Icon'

const MODES = [
  {
    iconProps: {
      name: 'sliders',
      style: { transform: 'rotate(90deg) translateX(2px)' },
    },
    component: Gantt,
    title: 'Timeline',
  },
  {
    iconProps: { name: 'calendar' },
    component: Calendar,
    title: 'Calendar',
  },
]

const getVisibleRanges = (startDate, endDate, ranges) =>
  ranges
    .filter(
      v =>
        moment(v.start).isSameOrBefore(endDate) &&
        (moment(v.end).isSameOrAfter(startDate) || !v.end)
    )
    .sort(sortRanges)

const TIMESCALE = 'month'

const TimeViewer = ({ className }) => {
  const books = useSelector(state => state.books.books)

  const ranges = books.map(book => ({
    start: book.start_date,
    end: book.end_date || book.on_hold,
    name: book.title,
    bookId: book.id,
    isOnHold: !!book.on_hold,
  }))
  const points = books.map(book => ({
    name: book.title,
    dates: [],
  }))

  const [startDate, setStartDate] = useState(
    moment().startOf(TIMESCALE).subtract(1, 'year').add(2, TIMESCALE)
  )
  const [modeIndex, setModeIndex] = useState(0)

  const changeDate = (add: boolean = true) => () => {
    setStartDate(
      add
        ? moment(startDate).add(1, TIMESCALE)
        : moment(startDate).subtract(1, TIMESCALE)
    )
  }

  const endDate = moment(startDate).add(1, 'year')
  const visibleRanges = getVisibleRanges(startDate, endDate, ranges)
  const readInCurrentYear = visibleRanges.filter(v => v.end).length

  const Component = MODES[modeIndex].component

  return (
    <div className={cx(className, 'pb4 time-viewer')}>
      <div className='mb4 flex justify-end justify-between-ns flex-wrap '>
        <div className='pb2 tc flex-auto flex justify-between justify-center-ns items-center'>
          <Button onClick={changeDate(false)}>
            <Icon name='arrow-left' />
          </Button>
          <span className='ph4 time-viewer__dates unselect'>
            {startDate.format("MMM 'YY")} -{' '}
            {moment(endDate).subtract(1, 'month').format("MMM 'YY")}
            &nbsp;
            <span
              className='unselect'
              title={`${readInCurrentYear} books read in ${moment(
                startDate
              ).format('YYYY')}`}
            >
              ({readInCurrentYear})
            </span>
          </span>
          <Button onClick={changeDate(true)}>
            <Icon name='arrow-right' />
          </Button>
        </div>
        <div className=''>
          {MODES.map((v, i) => (
            <Button
              className='ml2'
              isActive={modeIndex === i}
              onClick={() => setModeIndex(i)}
              title={v.title}
              key={i}
            >
              <Icon {...v.iconProps} />
            </Button>
          ))}
        </div>
      </div>
      <Component ranges={visibleRanges} points={points} startDate={startDate} />
    </div>
  )
}

export default TimeViewer
