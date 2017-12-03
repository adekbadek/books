// @flow

import { call, put, takeEvery } from 'redux-saga/effects'

import {
  request,
  getBooksURL,
} from 'utils/api.js'
import actions from 'store/actions'

const { setBooks, setFlashMessage } = actions

function * getBooks () {
  const books = yield call(request, {url: getBooksURL()})
  yield put(setBooks({books}))
}

const fetchFromApi = apiCallGenerator => function * performApiCall () {
  try {
    yield apiCallGenerator()
  } catch (e) {
    yield put(setFlashMessage({text: e.statusText, modifier: 'error'}))
  }
}

/*
  Starts fetchFromApi on each dispatched `BOOKS_FETCH` action.
  Allows concurrent fetches of user.
*/
export default function * rootSaga (): Generator<any, any, any> {
  yield takeEvery('BOOKS_FETCH', fetchFromApi(getBooks))
}
