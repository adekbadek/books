import React, { Component } from 'react'

class App extends Component {
  constructor () {
    super()
    this.state = {
      books: [],
    }
  }
  componentDidMount () {
    // TODO: fetch polyfill
    fetch('/api/books')
      .then(res => res.json())
      .then(books => {
        this.setState({books})
      })
  }
  render () {
    return (
      <div>
        <h1>books</h1>
        {this.state.books.map(book => {
          return (
            <p key={book.id}>{book.title}</p>
          )
        })}
      </div>
    )
  }
}

export default App
