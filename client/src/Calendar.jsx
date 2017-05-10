import React from 'react'
import moment from 'moment'

import './styles/calendar.css'
import { buttonClasses } from './utils/styling.js'
import { DATE_FORMAT, isDateInRange } from './utils/time.js'
import { times } from './utils/aux.js'

const DIMENSIONS = {
  columns: 53,
  rows: 7,
}

class Calendar extends React.Component {
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
          <button className={buttonClasses}
            onClick={() => {
              this.setState({startDate: moment(this.state.startDate).subtract(1, 'year')})
            }}
          >&lt;</button>
          <span className='ph4'>
            {this.state.startDate.format('YYYY')}
          </span>
          <button className={buttonClasses}
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
                const isInRange = isDateInRange(date, this.props.ranges)
                return (
                  <div
                    key={j}
                    className='calendar__cell'
                    style={{
                      opacity: this.state.startDate.get('year') === date.get('year') ? 1 : 0.5,
                      borderTopColor: date.date() === 1 && '#000',
                      backgroundColor: isInRange && '#2de650',
                    }}
                    title={date.format(DATE_FORMAT)}
                    data-weekday={date.format('dddd')}
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

export default Calendar
