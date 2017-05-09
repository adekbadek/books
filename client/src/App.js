import React from 'react'

import Book from './Book'

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
      <div>
        <h1>books</h1>
        <input type='text' placeholder='filter' value={this.state.searchInputVal} onChange={e => {
          this.setState({searchInputVal: e.target.value})
        }} />
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
        <form onSubmit={this.createBook}>
          <input type='text' placeholder='title' value={this.state.createBookInputVal} onChange={e => {
            this.setState({createBookInputVal: e.target.value})
          }} />
          <input type='submit' value='add' />
        </form>
      </div>
    )
  }
}

export default App
