// @flow

import type { TimeViewProps } from 'utils/types'

import React from 'react'
import { pluck } from 'ramda'
import moment from 'moment'
import cx from 'classnames'

import { getRangesForDate, getPointNames } from 'utils/time.js'
import { times, getCellStyles } from 'utils/aux.js'

const DIMENSIONS = {
  columns: 53,
  rows: 7,
}
const WEEK_DAYS_NAMES = moment.weekdaysShort()
const MONTH_DAYS_NAMES = moment.monthsShort()
const CELL_CLASSNAME = 'calendar__cell'

/**
 * Calendar that displays ranges and points
 */
export default (props: TimeViewProps) => {
  const displayedMonthNames = []
  return (
    <div>
      <div className='calendar'>
        {times(DIMENSIONS.columns).map((_, i) => {
          return (
            <div key={i} className='dib'>
              {times(DIMENSIONS.rows).map((_, j) => {
                const dayOfYearIndex = i * 7 + j + 1
                const date = moment(props.startDate)
                  .dayOfYear(dayOfYearIndex - props.startDate.day())
                const rangesData = getRangesForDate(date, props.ranges)
                const rangesNames = pluck('name', rangesData.map(({name}) => ({name})))
                const pointNames = getPointNames(props.points, date)
                const isFromAnotherYear = props.startDate.get('year') !== date.get('year')
                const displayDayName = i === 0 && j % 2 !== 0
                const monthName = MONTH_DAYS_NAMES[date.month()]
                const displayMonthName = (
                  j === 0 &&
                  !isFromAnotherYear &&
                  displayedMonthNames.indexOf(monthName) < 0 &&
                  monthName
                )
                if (displayMonthName) {
                  displayedMonthNames.push(displayMonthName)
                }
                return (
                  <div
                    key={j}
                    className={cx(
                      CELL_CLASSNAME,
                      {[`${CELL_CLASSNAME}--display-name`]: displayDayName || displayMonthName},
                      {[`${CELL_CLASSNAME}--display-day-name`]: displayDayName},
                      {[`${CELL_CLASSNAME}--display-month-name`]: displayMonthName},
                      {[`${CELL_CLASSNAME}--today`]: moment().isSame(date, 'day')},
                      {[`${CELL_CLASSNAME}--point`]: !!pointNames.length},
                      {[`${CELL_CLASSNAME}--point--dimmed`]: !!pointNames.length && moment().isAfter(date, 'day')},
                      {[`${CELL_CLASSNAME}--border-top`]: date.date() === 1},
                      {[`${CELL_CLASSNAME}--dimmed`]: isFromAnotherYear},
                    )}
                    data-dayname={displayDayName ? WEEK_DAYS_NAMES[j] : ''}
                    data-monthname={displayMonthName || ''}
                    style={getCellStyles(rangesData, rangesNames)}
                    >
                    {(!!rangesNames.length || !!pointNames.length) && <span
                      className='tooltip'
                      data-info={
                        `${
                          date.format('DD MMM')
                        }${
                          rangesNames.length ? ` | ${rangesNames.join(', ')}` : ''
                        }${
                          pointNames.length ? ` | rep - ${pointNames.join(', ')}` : ''
                        }`
                      }
                    />}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
