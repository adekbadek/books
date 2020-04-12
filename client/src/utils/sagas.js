// @flow

import type { Book, BookUpdatePayload } from 'utils/types'

import { all, call, put, takeEvery, select } from 'redux-saga/effects'
import { remove, append, findIndex, update } from 'ramda'

import { request, getBooksURL, getTodosURL, getUserInfoURL } from 'utils/api.js'
import actions, { todosActions } from 'store/actions'

const { setBooks, addBook, setFlashMessage, setUserData } = actions

function* fetchBooks(_) {
  const books = yield call(request, { url: getBooksURL() })
  yield put(setBooks({ books }))
}

function* fetchSingleBook(bookId) {
  const book = yield call(request, { url: getBooksURL(bookId) })
  yield put(addBook(book))
}

function* createBook({ title }: { title: string }) {
  const book = yield call(request, {
    url: getBooksURL(),
    method: 'POST',
    data: {
      title,
    },
  })
  const books = yield select(state => state.books.books)
  yield put(setBooks({ books: append(book, books) }))
}

function* deleteBook(id: $PropertyType<Book, 'id'>) {
  yield call(request, {
    url: getBooksURL(id),
    method: 'DELETE',
  })
  const books = yield select(state => state.books.books)
  yield put(setBooks({ books: books.filter(v => v.id !== id) }))
}

function* updateBook({ id, updateData }: BookUpdatePayload) {
  const book = yield call(request, {
    url: getBooksURL(id),
    method: 'PATCH',
    data: updateData,
  })
  const books = yield select(state => state.books.books)
  const updatedItemIndex = findIndex(v => v.id === id, books)
  yield put(setBooks({ books: update(updatedItemIndex, book, books) }))
}

function* fetchTodos(_) {
  const todos = yield call(request, { url: getTodosURL() })
  yield put(todosActions.setTodos({ todos }))
}

function* updateTodo({ id, updateData }) {
  const todo = yield call(request, {
    url: getTodosURL(id),
    method: 'PATCH',
    data: updateData,
  })
  const todos = yield select(state => state.todos.todos)
  const updatedItemIndex = findIndex(v => v.id === id, todos)
  yield put(
    todosActions.setTodos({
      todos: updateData.is_completed
        ? remove(updatedItemIndex, 1, todos)
        : update(updatedItemIndex, todo, todos),
    })
  )
}

function* getUserData(_) {
  const userData = yield call(request, { url: getUserInfoURL() })
  yield put(setUserData(userData))
}

const fetchFromApi = apiCallGenerator =>
  function* performApiCall({ payload }) {
    try {
      yield apiCallGenerator(payload)
    } catch (e) {
      yield put(setFlashMessage({ text: e.statusText, modifier: 'error' }))
    }
  }

/*
  Starts fetchFromApi on each dispatched action.
*/
export default function* rootSaga(): Generator<any, any, any> {
  yield all([
    takeEvery('BOOKS_FETCH', fetchFromApi(fetchBooks)),
    takeEvery('BOOKS_FETCH_SINGLE', fetchFromApi(fetchSingleBook)),
    takeEvery('BOOKS_CREATE', fetchFromApi(createBook)),
    takeEvery('BOOKS_DELETE', fetchFromApi(deleteBook)),
    takeEvery('BOOKS_UPDATE', fetchFromApi(updateBook)),

    takeEvery('GET_USER_DATA', fetchFromApi(getUserData)),

    takeEvery('TODOS_FETCH', fetchFromApi(fetchTodos)),
    takeEvery('TODOS_UPDATE', fetchFromApi(updateTodo)),
  ])
}
