// @flow

import type { Range, CalendarPoint } from 'utils/types'

import React from 'react'
import { pluck } from 'ramda'
import moment from 'moment'
import cx from 'classnames'

import { borderButtonClasses } from 'utils/styling.js'
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
export default class Calendar extends React.Component {
  props: {
    /**
     * ranges to mark on calendar (colored cells)
     */
    ranges: Array<Range>,
    /**
     * single points to mark with a dot
     */
    points: Array<CalendarPoint>,
  }
  state: {
    startDate: moment,
  } = {
    startDate: moment().startOf('year'),
  }
  render () {
    const displayedMonthNames = []
    return (
      <div className='pv4'>
        <div className='pb2 tc'>
          <button className={borderButtonClasses}
            onClick={() => {
              this.setState({startDate: moment(this.state.startDate).subtract(1, 'year')})
            }}
          >&lt;</button>
          <span className='ph4'>
            {this.state.startDate.format('YYYY')}
          </span>
          <button className={borderButtonClasses}
            onClick={() => {
              this.setState({startDate: moment(this.state.startDate).add(1, 'year')})
            }}
          >&gt;</button>
        </div>
        <div className='calendar'>
          {times(DIMENSIONS.columns).map((_, i) => {
            return (
              <div key={i} className='dib'>
                {times(DIMENSIONS.rows).map((_, j) => {
                  const dayOfYearIndex = i * 7 + j + 1
                  const date = moment(this.state.startDate)
                    .dayOfYear(dayOfYearIndex - this.state.startDate.day())
                  const rangesData = getRangesForDate(date, this.props.ranges)
                  const rangesNames = pluck('name', rangesData.map(({name}) => ({name})))
                  const pointNames = getPointNames(this.props.points, date)
                  const isFromAnotherYear = this.state.startDate.get('year') !== date.get('year')
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
}
