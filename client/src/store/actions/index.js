// @flow

import type { Action } from 'utils/types'

const actionCreator = (type: $PropertyType<Action, 'type'>) => (
  payload: $PropertyType<Action, 'payload'>
) => ({ type, payload })

export default {
  setFlashMessage: actionCreator('SET_FLASH_MESSAGE'),
  setLoaderState: actionCreator('SET_LOADER_STATE'),
  setUserData: actionCreator('SET_USER_DATA'),
  getUserData: actionCreator('GET_USER_DATA'),
  setBooks: actionCreator('SET_BOOKS'),
  addBook: actionCreator('ADD_BOOK'),
  setFilterInput: actionCreator('SET_FILTER_INPUT'),
  setFilterType: actionCreator('SET_FILTER_TYPE'),
  flushStore: actionCreator('FLUSH_STORE'),
}

export const booksActions = {
  fetchBooks: actionCreator('BOOKS_FETCH'),
  fetchSingleBook: actionCreator('BOOKS_FETCH_SINGLE'),
  createBook: actionCreator('BOOKS_CREATE'),
  deleteBook: actionCreator('BOOKS_DELETE'),
  updateBook: actionCreator('BOOKS_UPDATE'),
}

export const todosActions = {
  fetchTodos: actionCreator('TODOS_FETCH'),
  fetchAllTodos: actionCreator('TODOS_FETCH_ALL'),
  setTodos: actionCreator('SET_TODOS'),
  updateTodo: actionCreator('TODOS_UPDATE'),
  deleteTodo: actionCreator('TODOS_DELETE'),
}
