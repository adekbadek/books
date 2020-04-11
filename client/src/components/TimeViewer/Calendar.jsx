// @flow

import type { TimeViewProps } from 'utils/types'

import React from 'react'
import { pluck } from 'ramda'
import moment from 'moment'
import cx from 'classnames'

import { getRangesForDate } from 'utils/time.js'
import { times, getCellStyles } from 'utils/aux.js'

const DIMENSIONS = {
  weeks: 53,
  weekdays: 7,
}
const CELL_CLASSNAME = 'calendar__cell'

/**
 * Calendar that displays ranges.
 */
export default (props: TimeViewProps) => {
  const startDate = moment(props.startDate).startOf('isoWeek')
  return (
    <div>
      <div className='calendar'>
        {times(DIMENSIONS.weeks).map((_, weekIndex) => {
          return (
            <div key={weekIndex} className='dib'>
              {times(DIMENSIONS.weekdays).map((_, weekdayIndex) => {
                const dayIndex = weekIndex * DIMENSIONS.weekdays + weekdayIndex
                const date = moment(startDate).add(dayIndex, 'days')

                const rangesData = getRangesForDate(date, props.ranges)
                const rangesNames = pluck('name', rangesData.map(({name}) => ({name})))

                const dayName = weekIndex === 0 && weekdayIndex % 2 !== 0 && date.format('ddd')
                const monthName = weekdayIndex === 0 && date.date() <= 7 && date.format('MMM')
                return (
                  <div
                    key={weekdayIndex}
                    className={cx(
                      CELL_CLASSNAME,
                      {[`${CELL_CLASSNAME}--display-name`]: dayName || monthName},
                      {[`${CELL_CLASSNAME}--display-day-name`]: dayName},
                      {[`${CELL_CLASSNAME}--display-month-name`]: monthName},
                      {[`${CELL_CLASSNAME}--today`]: moment().isSame(date, 'day')},
                      {[`${CELL_CLASSNAME}--border-top`]: date.date() === 1},
                    )}
                    data-dayname={dayName || ''}
                    data-monthname={monthName || ''}
                    style={getCellStyles(rangesData, rangesNames)}
                    >
                    {(!!rangesNames.length) && <span
                      className='tooltip'
                      data-info={
                        `${
                          date.format('DD MMM')
                        }${
                          rangesNames.length ? ` | ${rangesNames.join(', ')}` : ''
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
