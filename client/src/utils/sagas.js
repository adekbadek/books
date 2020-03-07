// @flow

import type { Book, BookUpdatePayload } from 'utils/types'

import { all, call, put, takeEvery, select } from 'redux-saga/effects'
import { append, findIndex, update } from 'ramda'

import {
  request,
  getBooksURL,
  getUserInfoURL,
} from 'utils/api.js'
import actions from 'store/actions'

const { setBooks, addBook, setFlashMessage, setUserData } = actions

function * fetchBooks (_) {
  const books = yield call(request, {url: getBooksURL()})
  yield put(setBooks({books}))
}

function * fetchSingleBook (bookId) {
  const book = yield call(request, {url: getBooksURL(bookId)})
  yield put(addBook(book))
}

function * createBook (title: string) {
  const book = yield call(
    request,
    {
      url: getBooksURL(),
      method: 'POST',
      data: {
        title,
      },
    }
  )
  const books = yield select(state => state.books.books)
  yield put(setBooks({books: append(book, books)}))
}

function * deleteBook (id: $PropertyType<Book, 'id'>) {
  yield call(
    request,
    {
      url: getBooksURL(id),
      method: 'DELETE'
    }
  )
  const books = yield select(state => state.books.books)
  yield put(setBooks({books: books.filter(v => v.id !== id)}))
}

function * updateBook ({id, updateData}: BookUpdatePayload) {
  const book = yield call(
    request,
    {
      url: getBooksURL(id),
      method: 'PATCH',
      data: updateData,
    }
  )
  const books = yield select(state => state.books.books)
  const updatedBookIndex = findIndex(v => v.id === id, books)
  yield put(setBooks({books: update(updatedBookIndex, book, books)}))
}

function * getUserData (_) {
  const userData = yield call(
    request,
    {url: getUserInfoURL()}
  )
  yield put(setUserData(userData))
}

const fetchFromApi = apiCallGenerator => function * performApiCall ({payload}) {
  try {
    yield apiCallGenerator(payload)
  } catch (e) {
    yield put(setFlashMessage({text: e.statusText, modifier: 'error'}))
  }
}

/*
  Starts fetchFromApi on each dispatched action.
*/
export default function * rootSaga (): Generator<any, any, any> {
  yield all([
    takeEvery('BOOKS_FETCH', fetchFromApi(fetchBooks)),
    takeEvery('BOOKS_FETCH_SINGLE', fetchFromApi(fetchSingleBook)),
    takeEvery('BOOKS_CREATE', fetchFromApi(createBook)),
    takeEvery('BOOKS_DELETE', fetchFromApi(deleteBook)),
    takeEvery('BOOKS_UPDATE', fetchFromApi(updateBook)),
    takeEvery('GET_USER_DATA', fetchFromApi(getUserData)),
  ])
}
