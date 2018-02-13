// @flow

import type { TimeViewProps } from 'utils/types'

import React from 'react'
import moment from 'moment'
import cx from 'classnames'

import { sortRanges, displayBookTitle } from 'utils/aux.js'

const getRangesInYear = (year, ranges) => ranges
  .filter(v => (
    year.isSame(v.start, 'year') ||
    year.isSame(v.end, 'year') ||
    (v.start && !v.end)
  ))
  .sort(sortRanges)

const ROW_HEIGHT = 23
const DAYS_IN_YEAR = 365
const CLASSNAME_BASE = 'gantt'
const MONTH_DAYS_NAMES = moment.monthsShort()

const getDayYearPercentage = (days: number) => Math.round(days * 100 / DAYS_IN_YEAR)

export default (props: TimeViewProps) => {
  const rangesToDisplay = getRangesInYear(props.startDate, props.ranges)
  const containerHeight = rangesToDisplay.length * ROW_HEIGHT
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
          >{v}</div>
        ))}
      </div>
      <div
        className={cx('posr', `${CLASSNAME_BASE}__months`)}
        style={{
          height: `${containerHeight}px`,
        }}
      >
        {rangesToDisplay.map((range, i) => {
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
              title={range.name}
              style={{
                top: `${i * ROW_HEIGHT}px`,
                width: `${width}%`,
                height: `${ROW_HEIGHT * 0.85}px`,
                left: `${left}%`,
              }}
          >
              <span>{displayBookTitle(range.name)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
