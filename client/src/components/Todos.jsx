// @flow

import React, { useEffect } from 'react'
import cx from 'classnames'
import { useSelector, useDispatch } from 'react-redux'

import Table from 'components/Table'
import { borderButtonClasses } from 'utils/styling.js'
import { todosActions } from 'store/actions'

const translateAction = action =>
  ({
    review: 'Review',
    prepare_notes: 'Prepare Notes for',
  }[action])

const SingleTodo = ({ todo }) => (
  <div className='flex items-center justify-between pv1'>
    <span>
      {translateAction(todo.action)} {todo.book_title}
    </span>
    <div className='flex items-center'>
      <div className='pr3'>{todo.due_date}</div>
      <button className={cx(borderButtonClasses)}>done</button>
    </div>
  </div>
)

const Todos = () => {
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos.todos)
  useEffect(() => {
    dispatch(todosActions.fetchTodos())
  }, [])

  return todos.length ? (
    <Table wrapperClassName='pt2' headers={["To-do's"]}>
      {todos.map(todo => (
        <tr key={todo.id}>
          <td>
            <SingleTodo todo={todo} />
          </td>
        </tr>
      ))}
    </Table>
  ) : null
}

export default Todos
