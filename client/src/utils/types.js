// @flow

export type Book = {
  id: number,
  created_at: string,
  updated_at: string,
  title: string,
  user_id: number,
  start_date?: string,
  end_date?: string,
  rep_1?: null | string,
  rep_2?: null | string,
  rep_3?: null | string,
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
