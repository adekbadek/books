// @flow

import React, { useEffect } from 'react'
import cx from 'classnames'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { uniqBy, prop } from 'ramda'

import Table from 'components/Table'
import RouteLink from 'components/RouteLink'
import BookLink from 'components/BookLink'
import Button from 'components/Button'
import { TODOS_VIEW_URL } from 'utils/api'
import { todosActions } from 'store/actions'
import { todosCollection } from 'store/selectors'
import { DATE_FORMAT } from 'utils/time'

const translateAction = action =>
  ({
    review: 'Review',
    prepare_notes: 'Prepare notes from',
  }[action])

export const SingleTodo = ({ todo, withRemoveButtons, shouldUpdateAll }) => {
  const dispatch = useDispatch()
  const dueMoment = moment(todo.due_date)
  const isDisabled = todo.isBeingUpdated

  const toggleComplete = isCompleted => () =>
    dispatch(
      todosActions.updateTodo({
        id: todo.id,
        updateData: {
          is_completed: isCompleted,
          ...(!isCompleted && { completed_on: null }),
        },
        shouldUpdateAll,
      })
    )

  const handleDelete = () => dispatch(todosActions.deleteTodo(todo.id))

  return (
    <div
      className={cx('flex items-center justify-between pv1', {
        'o-50': isDisabled,
      })}
    >
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
          title={todo.completed_on || todo.due_date}
        >
          {todo.completed_on
            ? `Completed on ${moment(todo.completed_on).format(DATE_FORMAT)}`
            : dueMoment.fromNow()}
        </div>
        <Button
          disabled={isDisabled}
          onClick={toggleComplete(!todo.is_completed)}
        >
          {todo.is_completed ? 'undo' : 'done'}
        </Button>
        {withRemoveButtons && (
          <Button disabled={isDisabled} className='ml2' onClick={handleDelete}>
            remove
          </Button>
        )}
      </div>
    </div>
  )
}

const MAX_TODOS_DISPLAYED = 6

const Todos = ({ className }) => {
  const dispatch = useDispatch()
  const todos = useSelector(todosCollection({ all: false }))
  useEffect(() => {
    dispatch(todosActions.fetchTodos())
  }, [])

  const todosToDisplay = uniqBy(prop('book_id'), todos)
  const overflow = todosToDisplay.length - MAX_TODOS_DISPLAYED

  return todosToDisplay.length ? (
    <Table
      wrapperClassName={className}
      headers={[
        () =>
          overflow > 0 ? (
            "To-do's"
          ) : (
            <RouteLink url={TODOS_VIEW_URL} className='underline'>
              To-do's
            </RouteLink>
          ),
      ]}
    >
      {todosToDisplay.slice(0, MAX_TODOS_DISPLAYED).map(todo => (
        <tr key={todo.id}>
          <td>
            <SingleTodo todo={todo} />
          </td>
        </tr>
      ))}
      {overflow > 0 && (
        <tr>
          <td className='pt2'>
            <RouteLink url={TODOS_VIEW_URL} className='underline'>
              + {overflow} more
            </RouteLink>
          </td>
        </tr>
      )}
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
