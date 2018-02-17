
// @flow

import React from 'react'
import moment from 'moment'
import cx from 'classnames'

import { borderButtonClasses } from 'utils/styling.js'
import { sortRanges } from 'utils/aux.js'
import Calendar from 'components/TimeViewer/Calendar'
import Gantt from 'components/TimeViewer/Gantt'
import Icon from 'components/Icon'

const MODES = [
  {
    iconProps: {name: 'sliders', style: {transform: 'rotate(90deg) translateX(2px)'}},
    component: Gantt,
    title: 'Timeline',
  },
  {
    iconProps: {name: 'calendar'},
    component: Calendar,
    title: 'Calendar',
  },
]

const getVisibleRanges = (startDate, endDate, ranges) => ranges
  .filter(v => (
    moment(v.start).isSameOrBefore(endDate) &&
    (moment(v.end).isSameOrAfter(startDate) || !v.end)
  ))
  .sort(sortRanges)

const TIMESCALE = 'month'

export default class TimeViewer extends React.Component {
  state: {
    startDate: moment,
    modeIndex: number,
  } = {
    startDate: moment().startOf(TIMESCALE).subtract(1, 'year').add(1, TIMESCALE),
    modeIndex: 0,
  }
  changeDate = (add: boolean = true) => () => {
    this.setState({
      startDate: add ? moment(this.state.startDate).add(1, TIMESCALE) : moment(this.state.startDate).subtract(1, TIMESCALE)
    })
  }
  render () {
    const endDate = moment(this.state.startDate).add(1, 'year')
    const visibleRanges = getVisibleRanges(this.state.startDate, endDate, this.props.ranges)
    const readInCurrentYear = visibleRanges.filter(v => v.end).length
    const Component = MODES[this.state.modeIndex].component
    return (
      <div className='pb4'>
        <div className='pb2 mt4 tc posr'>
          <button
            className={borderButtonClasses}
            onClick={this.changeDate(false)}
          ><Icon name='arrow-left' /></button>
          <span className='ph4'>
            {this.state.startDate.format('MMM \'YY')} - {moment(endDate).subtract(1, 'month').format('MMM \'YY')}&nbsp;
            <span
              title={`${readInCurrentYear} books read in ${moment(this.state.startDate).format('YYYY')}`}
            >({readInCurrentYear})</span>
          </span>
          <button
            className={borderButtonClasses}
            onClick={this.changeDate(true)}
          ><Icon name='arrow-right' /></button>
          <div className='posa' style={{top: 0, right: 0}}>
            {MODES.map((v, i) => (
              <button
                className={cx(borderButtonClasses, 'ml2', {'button--active': this.state.modeIndex === i})}
                onClick={() => this.setState({modeIndex: i})}
                title={v.title}
                key={i}
              ><Icon {...v.iconProps} /></button>
            ))}
          </div>
        </div>
        <Component
          ranges={visibleRanges}
          points={this.props.points}
          startDate={this.state.startDate}
        />
      </div>
    )
  }
}
