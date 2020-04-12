// @flow

import React, { useEffect } from 'react'
import cx from 'classnames'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { uniqBy, prop } from 'ramda'

import Table from 'components/Table'
import RouteLink from 'components/RouteLink'
import BookLink from 'components/BookLink'
import { TODOS_VIEW_URL } from 'utils/api'
import { borderButtonClasses } from 'utils/styling'
import { todosActions } from 'store/actions'
import { todosCollection } from 'store/selectors'

const translateAction = action =>
  ({
    review: 'Review',
    prepare_notes: 'Prepare notes from',
  }[action])

export const SingleTodo = ({ todo, withRemoveButtons }) => {
  const dispatch = useDispatch()
  const dueMoment = moment(todo.due_date)

  const handleComplete = () =>
    dispatch(
      todosActions.updateTodo({
        id: todo.id,
        updateData: { is_completed: true },
      })
    )

  const handleDelete = () => dispatch(todosActions.deleteTodo(todo.id))

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
          className={cx('pr3', {
            'light-red': !todo.is_completed && dueMoment.isBefore(),
            blue: todo.is_completed,
          })}
          title={todo.due_date}
        >
          {dueMoment.fromNow()}
        </div>
        <button className={cx(borderButtonClasses)} onClick={handleComplete}>
          done
        </button>
        {withRemoveButtons && (
          <button
            className={cx(borderButtonClasses, 'ml2')}
            onClick={handleDelete}
          >
            remove
          </button>
        )}
      </div>
    </div>
  )
}

const Todos = ({ className }) => {
  const dispatch = useDispatch()
  const todos = useSelector(todosCollection({ all: false }))
  useEffect(() => {
    dispatch(todosActions.fetchTodos())
  }, [])

  return todos.length ? (
    <Table
      wrapperClassName={className}
      headers={[
        () => (
          <RouteLink url={TODOS_VIEW_URL} className='underline'>
            To-do's
          </RouteLink>
        ),
      ]}
    >
      {uniqBy(prop('book_id'), todos).map(todo => (
        <tr key={todo.id}>
          <td>
            <SingleTodo todo={todo} />
          </td>
        </tr>
      ))}
    </Table>
  ) : (
    <div className={cx(className, 'i f6')}>
      Nothing to do, keep on reading. (
      <RouteLink url={TODOS_VIEW_URL} className='underline'>
        all to-do's
      </RouteLink>
      )
    </div>
  )
}

export default Todos
