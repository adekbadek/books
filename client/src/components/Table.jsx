// @flow

import React, { Children } from 'react'
import cx from 'classnames'

type TableProps = {
  headers: Array<string | (() => Node)>,
  children: Children,
  tableClassName?: string,
}

const Table = (props: TableProps) => (
  <div className={props.wrapperClassName || 'pv4'}>
    <div>
      <table
        className={cx('f6 w-100 mw8 center', props.tableClassName)}
        cellSpacing='0'
      >
        {props.headers && props.headers.length && (
          <thead>
            <tr>
              {props.headers.map((t, i) => (
                <th key={i} className='bb b--black-20 tl pb2 pr3 f4'>
                  {typeof t === 'string' ? t : t()}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className='lh-copy'>{props.children}</tbody>
      </table>
    </div>
  </div>
)

export default Table
