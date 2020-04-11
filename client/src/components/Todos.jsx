// @flow

import React from 'react'
import cx from 'classnames'

import Table from 'components/Table'
import { borderButtonClasses } from 'utils/styling.js'

const defaultTodos = [
  {id: '1', due: 'in 1 day', content: 'Add notes for "Sapiens"'},
  {id: '2', due: '2 days ago', content: 'Review "Laszlo Third"'},
]

const SingleTodo = ({todo}) => (
  <div className='flex items-center justify-between pv1'>
    <span>{todo.content}</span>
    <div className='flex items-center'>
      <div className='pr3'>{todo.due}</div>
      <button className={cx(borderButtonClasses)}>done</button>
    </div>
  </div>
)

const Todos = ({todos = defaultTodos}) => {
  return todos.length ? (
    <Table
      wrapperClassName='pt2'
      headers={['To-do\'s']}
    >
      {todos.map((todo) => <tr key={todo.id}><td>
        <SingleTodo todo={todo} />
      </td></tr>)}
    </Table>
  ) : null
}

export default Todos
