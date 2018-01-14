// @flow

export type Book = {
  id: number,
  title: string,
  start_date?: string,
  end_date?: string,
  on_hold?: string,
  reps: Array<string>,
}

export type Range = {
  start?: string,
  end?: string,
  name: string,
  isDimmed?: bool,
}

export type AuthFormFields = {
  email: string,
  password: string,
}

export type Repetition = {
  title: string,
  date: string
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

export type CalendarPoint = {
  dates: Array<string>,
  name: string,
}

export type BookUpdatePayload = {
  id: $PropertyType<Book, 'id'>,
  updateData: {}
}
