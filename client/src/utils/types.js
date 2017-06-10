// @flow

export type Book = {
  id: number,
  created_at: string,
  updated_at: string,
  title: string,
  user_id: number,
  start_date?: string,
  end_date?: string,
}

export type Range = {
  start: string,
  end: string,
  name: string,
}
