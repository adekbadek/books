import React from 'react'
import moment from 'moment'
import cx from 'classnames'

import { borderButtonClasses } from 'utils/styling.js'
import { getRangesForDate } from 'utils/time.js'
import { times } from 'utils/aux.js'

const DIMENSIONS = {
  columns: 53,
  rows: 7,
}

const CELL_CLASSNAME = 'calendar__cell'

export default class Calendar extends React.Component {
  constructor () {
    super()
    const startDate = moment().startOf('year')
    this.state = {
      startDate,
      firstDayOfYear: startDate.dayOfYear(1).day(),
    }
  }
  render () {
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
        {times(DIMENSIONS.columns).map((_, i) => {
          return (
            <div key={i} className='dib'>
              {times(DIMENSIONS.rows).map((_, j) => {
                const dayOfYearIndex = i * 7 + j + 1
                const date = moment(this.state.startDate).dayOfYear(dayOfYearIndex - this.state.startDate.day())
                let points = []
                const isInRange = getRangesForDate(date, this.props.ranges)
                const isAPoint = !!this.props.points.filter(point => {
                  const is = !!point.points.filter(v => date.isSame(v)).length
                  if (is) {
                    points.push(point.name)
                  }
                  return is
                }).length
                return (
                  <div
                    key={j}
                    className={cx(
                      CELL_CLASSNAME,
                      {tooltip: !!isInRange.length || isAPoint},
                      {[`${CELL_CLASSNAME}--today`]: moment().isSame(date, 'day')},
                      {[`${CELL_CLASSNAME}--in-range`]: !!isInRange.length},
                      {[`${CELL_CLASSNAME}--point`]: isAPoint},
                      {[`${CELL_CLASSNAME}--point--dimmed`]: isAPoint && moment().isAfter(date, 'day')},
                      {[`${CELL_CLASSNAME}--border-top`]: date.date() === 1},
                      {[`${CELL_CLASSNAME}--dimmed`]: this.state.startDate.get('year') !== date.get('year')}
                    )}
                    data-info={`${date.format('DD MMM')}${isInRange.length ? ` | ${isInRange.join(', ')}` : ''}${isAPoint ? ` | rep - ${points.join(', ')}` : ''}`}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}
