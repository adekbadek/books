// @flow

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Table from 'components/Table'
import { SingleTodo } from 'components/Todos'
import { todosActions } from 'store/actions'
import { todosCollection } from 'store/selectors'

const AllTodos = ({ bookId }) => {
  const dispatch = useDispatch()
  const todos = useSelector(todosCollection())
  useEffect(() => {
    dispatch(todosActions.fetchAllTodos())
  }, [])

  return (
    <Table>
      {todos.map(todo => (
        <tr key={todo.id}>
          <td>
            <SingleTodo todo={todo} withRemoveButtons />
          </td>
        </tr>
      ))}
    </Table>
  )
}

export default AllTodos
