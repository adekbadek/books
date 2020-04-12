// @flow

import React, { useEffect } from 'react'
import cx from 'classnames'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

import Table from 'components/Table'
import BookLink from 'components/BookLink'
import { borderButtonClasses } from 'utils/styling'
import { sortByDate } from 'utils/aux'
import { todosActions } from 'store/actions'

const translateAction = action =>
  ({
    review: 'Review',
    prepare_notes: 'Prepare notes from',
  }[action])

const SingleTodo = ({ todo }) => {
  const dispatch = useDispatch()
  const dueMoment = moment(todo.due_date)
  return (
    <div className='flex items-center justify-between pv1'>
      <span>
        {translateAction(todo.action)}{' '}
        <BookLink
          book={{ id: todo.book_id, title: todo.book_title }}
          className='underline'
        />
      </span>
      <div className='flex items-center'>
        <div
          className={cx('pr3', { 'light-red': dueMoment.isBefore() })}
          title={todo.due_date}
        >
          {dueMoment.fromNow()}
        </div>
        <button
          className={cx(borderButtonClasses)}
          onClick={() =>
            dispatch(
              todosActions.updateTodo({
                id: todo.id,
                updateData: { is_completed: true },
              })
            )
          }
        >
          done
        </button>
      </div>
    </div>
  )
}

const Todos = ({ className }) => {
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos.todos)
  useEffect(() => {
    dispatch(todosActions.fetchTodos())
  }, [])

  return todos.length ? (
    <Table wrapperClassName={className} headers={[`To-do's`]}>
      {todos.sort(sortByDate('due_date')).map(todo => (
        <tr key={todo.id}>
          <td>
            <SingleTodo todo={todo} />
          </td>
        </tr>
      ))}
    </Table>
  ) : (
    <div className={cx(className, 'i')}>Nothing to do, keep on reading.</div>
  )
}

export default Todos
