// @flow

import moment from 'moment'

export type Book = {
  id: number,
  title: string,
  start_date?: string,
  end_date?: string,
  on_hold?: string,
  reason?: string,
}

export type Todo = {
  id: number,
  is_completed: boolean,
  book_id: $PropertyType<Book, 'id'>,
  book_title: $PropertyType<Book, 'title'>,
  due_date: string,
  completed_on: string,
  action: string,
}

export type Range = {
  start?: string,
  end?: string,
  bookId: $PropertyType<Book, 'id'>,
  name: string,
  isOnHold?: boolean,
}

export type AuthFormFields = {
  email: string,
  password: string,
}

export type User = {
  name: string | null,
  email: string,
}

export type Action = {
  +type: string,
  +payload: any,
}

export type ActionFunction = ($PropertyType<Action, 'payload'>) => void

export type FlashMessageObject = {
  text: string,
  modifier: string,
}

export type UiState = {
  +message: string | null,
  +displayLoader: boolean | null,
  +filterType: string,
  +filterInput?: string,
}

export type BooksState = {
  +books: Array<Book>,
}

export type Store = {
  +books: BooksState,
  +ui: UiState,
}

export type BookUpdatePayload = {
  id: $PropertyType<Book, 'id'>,
  updateData: {},
}

export type InputEvent = Event & { currentTarget: HTMLInputElement }

export type TimeViewProps = {
  startDate: moment,
  /**
   * ranges to mark on calendar (colored cells)
   */
  ranges: Array<Range>,
}
