// @flow

import React, { useState } from 'react'
import moment from 'moment'
import cx from 'classnames'
import { useSelector } from 'react-redux'

import { borderButtonClasses } from 'utils/styling.js'
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

const TimeViewer = () => {
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
    moment()
      .startOf(TIMESCALE)
      .subtract(1, 'year')
      .add(1, TIMESCALE)
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
    <div className='pb4 time-viewer'>
      <div className='pb2 mt4 tc posr'>
        <button className={borderButtonClasses} onClick={changeDate(false)}>
          <Icon name='arrow-left' />
        </button>
        <span className='ph4 time-viewer__dates'>
          {startDate.format("MMM 'YY")} -{' '}
          {moment(endDate)
            .subtract(1, 'month')
            .format("MMM 'YY")}
          &nbsp;
          <span
            title={`${readInCurrentYear} books read in ${moment(
              startDate
            ).format('YYYY')}`}
          >
            ({readInCurrentYear})
          </span>
        </span>
        <button className={borderButtonClasses} onClick={changeDate(true)}>
          <Icon name='arrow-right' />
        </button>
        <div className='posa' style={{ top: 0, right: 0 }}>
          {MODES.map((v, i) => (
            <button
              className={cx(borderButtonClasses, 'ml2', {
                'button--active': modeIndex === i,
              })}
              onClick={() => setModeIndex(i)}
              title={v.title}
              key={i}
            >
              <Icon {...v.iconProps} />
            </button>
          ))}
        </div>
      </div>
      <Component ranges={visibleRanges} points={points} startDate={startDate} />
    </div>
  )
}

export default TimeViewer
