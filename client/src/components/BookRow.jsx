// @flow

import type { Book } from 'utils/types'

import React from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import classnames from 'classnames'
import { find } from 'ramda'

import { DATE_FORMAT } from 'utils/time'
import { getBookViewUrl } from 'utils/api'

type BookRowProps = {
  book: Book,
}

const DateCell = ({book, props, prop}) => {
  const propArray = prop.split('|')
  const validProp = find(p => Boolean(book[p]), propArray)
  return (
    <div className={classnames({
      'table__cell--dimmed': validProp === 'on_hold'
    })}>
      {book[validProp] ? moment(book[validProp]).format(DATE_FORMAT) : '-'}
    </div>
  )
}

export default ({book, ...props}: BookRowProps) => {
  const history = useHistory()

  const handleBookClick = () => {
    history.push(getBookViewUrl(book.id))
  }

  const getCell = (col) => ({
    title: <div>{book.title}</div>,
    author: <div>{book.author_name}</div>,
    date: <DateCell book={book} props={props} prop={col.prop} />,
  }[col.component])

  const getClassName = ({component}) => ({
    title: 'table__cell--book-title',
  })[component]
  return (
    <tr onClick={handleBookClick}>
      {props.columns.map((col, i) => (
        <td key={i} className={classnames(getClassName(col), 'pv2 pr3 bb b--black-20')}>
          {getCell(col)}
        </td>
      ))}
    </tr>
  )
}
