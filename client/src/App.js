import React, { Component } from 'react'

class App extends Component {
  constructor () {
    super()
    this.setInputState = this.setInputState.bind(this)
    this.submit = this.submit.bind(this)
    this.refreshBooks = this.refreshBooks.bind(this)
    this.state = {
      books: [],
      inputVal: '',
    }
  }
  setInputState (e) {
    this.setState({inputVal: e.target.value})
  }
  submit (e) {
    e.preventDefault()

    fetch('api/books', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.inputVal,
      })
    })
      .then(res => res.json())
      .then(() => {
        this.refreshBooks()
        this.setState({inputVal: ''})
      })
  }
  refreshBooks () {
    fetch('/api/books')
      .then(res => res.json())
      .then(books => {
        this.setState({books})
      })
  }
  componentDidMount () {
    this.refreshBooks()
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
        <form onSubmit={this.submit}>
          <input type='text' value={this.state.inputVal} onChange={this.setInputState} />
          <input type='submit' value='add' />
        </form>
      </div>
    )
  }
}

export default App
