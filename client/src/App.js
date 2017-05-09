import React, { Component } from 'react'

class App extends Component {
  constructor () {
    super()
    this.getBooks = this.getBooks.bind(this)
    this.setCreateBookInputState = this.setCreateBookInputState.bind(this)
    this.setSearchInputState = this.setSearchInputState.bind(this)
    this.createBook = this.createBook.bind(this)
    this.deleteBook = this.deleteBook.bind(this)
    this.refreshBooks = this.refreshBooks.bind(this)
    this.state = {
      books: [],
      createBookInputVal: '',
      searchInputVal: '',
    }
  }
  setCreateBookInputState (e) {
    this.setState({createBookInputVal: e.target.value})
  }
  setSearchInputState (e) {
    this.setState({searchInputVal: e.target.value})
  }
  createBook (e) {
    e.preventDefault()

    fetch('api/books', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.createBookInputVal,
      })
    })
      .then(() => {
        this.refreshBooks()
        this.setState({createBookInputVal: ''})
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
      .then(this.refreshBooks)
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
        <input type='text' value={this.state.searchInputVal} onChange={this.setSearchInputState} />
        {this.getBooks().map(book => {
          return (
            <div key={book.id}>
              <button onClick={() => {
                this.deleteBook(book.id)
              }}>delete</button>
              <span>{book.title}</span>
            </div>
          )
        })}
        <form onSubmit={this.createBook}>
          <input type='text' value={this.state.createBookInputVal} onChange={this.setCreateBookInputState} />
          <input type='submit' value='add' />
        </form>
      </div>
    )
  }
}

export default App
