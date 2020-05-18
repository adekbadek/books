// @flow

import { groupBy } from 'ramda'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Table from 'components/Table'
import { SingleTodo } from 'components/Todos'
import { todosActions } from 'store/actions'
import { todosCollection } from 'store/selectors'

const AllTodos = ({ bookId }) => {
  const dispatch = useDispatch()
  const todos = useSelector(todosCollection())

  const { active = [], completed = [] } = groupBy(
    todo => (todo.is_completed ? 'completed' : 'active'),
    todos
  )

  useEffect(() => {
    dispatch(todosActions.fetchAllTodos())
  }, [])

  const renderSingle = todo => (
    <tr key={todo.id}>
      <td>
        <SingleTodo todo={todo} withRemoveButtons shouldUpdateAll />
      </td>
    </tr>
  )

  return (
    <Table wrapperClassName='pb4'>
      {active.map(renderSingle)}
      <tr>
        <td>
          <div className='mt4' />
        </td>
      </tr>
      {completed.map(renderSingle)}
    </Table>
  )
}

export default AllTodos
