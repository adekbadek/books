import React from 'react'

import Book from './Book'
import Calendar from './Calendar'

class App extends React.Component {
  constructor () {
    super()
    this.getBooks = this.getBooks.bind(this)
    this.createBook = this.createBook.bind(this)
    this.deleteBook = this.deleteBook.bind(this)
    this.updateBook = this.updateBook.bind(this)
    this.refreshBooks = this.refreshBooks.bind(this)
    this.state = {
      books: [],
      createBookInputVal: '',
      searchInputVal: '',
      editedBookId: null,
    }
  }
  createBook (e) {
    e.preventDefault()

    fetch('api/books', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.createBookInputVal,
      })
    })
      .then(res => res.json())
      .then((book) => {
        this.setState({
          books: this.state.books.concat([book]),
          createBookInputVal: ''
        })
      })
  }
  refreshBooks () {
    fetch('/api/books')
      .then(res => res.json())
      .then(books => this.setState({books}))
  }
  deleteBook (id) {
    fetch(`api/books/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.setState({
          books: this.state.books.filter(v => v.id !== id)
        })
      })
  }
  updateBook (id, updatedBook) {
    fetch(`api/books/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedBook)
    })
      .then(() => {
        this.refreshBooks()
        this.setState({editedBookId: null})
      })
  }
  componentDidMount () {
    this.refreshBooks()
  }
  getBooks () {
    const query = this.state.searchInputVal
    return this.state.books.filter(v => !query || v.title.match(new RegExp(query, 'i')))
  }
  render () {
    return (
      <div className='pa4'>
        <h1 className='mt0'>books</h1>
        <input type='text' placeholder='filter' value={this.state.searchInputVal} onChange={e => {
          this.setState({searchInputVal: e.target.value})
        }} />
        <div className='pv4'>
          <div className='overflow-auto'>
            <table className='f6 w-100 mw8 center' cellSpacing='0'>
              <thead>
                <tr>
                  {['Title', 'Start', 'End', 'Actions'].map((t, i) => <th key={i} className='bb b--black-20 tl pb2 pr3'>{t}</th>)}
                </tr>
              </thead>
              <tbody className='lh-copy'>
                {this.getBooks().map(book => {
                  return (
                    <Book
                      key={book.id}
                      book={book}
                      deleteHandler={this.deleteBook}
                      updateHandler={data => {
                        this.updateBook(book.id, data)
                      }}
                      isEdited={this.state.editedBookId === book.id}
                      onClickHandler={() => {
                        this.setState({editedBookId: book.id})
                      }}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <form onSubmit={this.createBook}>
          <input type='text' placeholder='title' value={this.state.createBookInputVal} onChange={e => {
            this.setState({createBookInputVal: e.target.value})
          }} />
          <input type='submit' value='add' className='ml1 ba b--black bg-transparent pointer' />
        </form>
        <Calendar
          ranges={this.state.books.map(book => {
            return {start: book.start_date, end: book.end_date, name: book.title}
          })}
        />
      </div>
    )
  }
}

export default App
