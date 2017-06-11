// @flow

export type Book = {
  id: number,
  title: string,
  start_date?: string,
  end_date?: string,
  reps: Array<string>,
}

export type Range = {
  start: string,
  end: string,
  name: string,
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
