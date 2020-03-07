// @flow

import type { TimeViewProps } from 'utils/types'

import React from 'react'
import moment from 'moment'
import cx from 'classnames'

import BookLink from 'components/BookLink'

const DAYS_IN_YEAR = 365
const ROW_HEIGHT = 23
const CLASSNAME_BASE = 'gantt'
const MONTH_DAYS_NAMES = moment.monthsShort()

const getDayYearPercentage = (days: number) => Math.round(days * 100 / DAYS_IN_YEAR)

export default (props: TimeViewProps) => {
  const containerHeight = props.ranges.length * ROW_HEIGHT
  const monthIndex = props.startDate.month()
  return (
    <div
      className='posr oh pt3'
    >
      <div className={cx('posa', `${CLASSNAME_BASE}__months`)}>
        {MONTH_DAYS_NAMES.map((v, i) => (
          <div
            key={i}
            className={`posa ${CLASSNAME_BASE}__months__item`}
            style={{
              left: `${getDayYearPercentage(
                moment(props.startDate).add(i, 'months').diff(props.startDate, 'days')
              )}%`,
              height: `${containerHeight}px`,
            }}
          >{MONTH_DAYS_NAMES[(monthIndex + i) % MONTH_DAYS_NAMES.length]}</div>
        ))}
      </div>
      <div
        className={cx('posr', `${CLASSNAME_BASE}__months`)}
        style={{
          height: `${containerHeight}px`,
        }}
      >
        {props.ranges.map((range, i) => {
          const diffDaysFromStart = moment(range.start).diff(props.startDate, 'days')
          const diffDaysToEnd = moment(range.end || undefined).diff(props.startDate, 'days')
          const left = Math.max(0, getDayYearPercentage(diffDaysFromStart))
          const width = getDayYearPercentage(diffDaysToEnd) - left
          return (
            <div
              key={i}
              className={cx(
                'posa',
                CLASSNAME_BASE,
                {
                  [`${CLASSNAME_BASE}--on-hold`]: range.isOnHold,
                  [`${CLASSNAME_BASE}--current`]: !range.end,
                }
              )}
              title={`${range.name}${(range.start && range.end) ? ` (${range.start} - ${range.end})` : ''}`}
              style={{
                top: `${i * ROW_HEIGHT}px`,
                width: `${width}%`,
                height: `${ROW_HEIGHT * 0.85}px`,
                left: `${left}%`,
              }}
            >
              <BookLink book={{id: range.bookId, title: range.name}} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
