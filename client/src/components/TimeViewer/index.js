// @flow

import React from 'react'
import moment from 'moment'
import cx from 'classnames'

import { borderButtonClasses } from 'utils/styling.js'
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

const getRangesInsideYear = (date, ranges) => ranges.filter(v => (
  date.isSame(v.start, 'year') && date.isSame(v.end, 'year')
))

export default class TimeViewer extends React.Component {
  state: {
    startDate: moment,
    modeIndex: number,
  } = {
    startDate: moment().startOf('year'),
    modeIndex: 0,
  }
  changeDate = (add: boolean = true) => () => {
    this.setState({
      startDate: add ? moment(this.state.startDate).add(1, 'year') : moment(this.state.startDate).subtract(1, 'year')
    })
  }
  render () {
    const readInCurrentYear = getRangesInsideYear(this.state.startDate, this.props.ranges).length
    const Component = MODES[this.state.modeIndex].component
    return (
      <div className='pb4'>
        <div className='pb2 mt4 tc posr'>
          <button
            className={borderButtonClasses}
            onClick={this.changeDate(false)}
          ><Icon name='arrow-left' /></button>
          <span className='ph4'>
            {this.state.startDate.year()}&nbsp;
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
          ranges={this.props.ranges}
          points={this.props.points}
          startDate={this.state.startDate}
        />
      </div>
    )
  }
}
