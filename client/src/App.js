import React from 'react'
import moment from 'moment'

import Book from 'components/Book'
import Calendar from 'components/Calendar'
import Table from 'components/Table'

import { getAllReps } from 'utils/aux.js'
import { DATE_FORMAT } from 'utils/time.js'

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
        <Table
          className='table--align-top'
          headers={['Currently reading', 'Upcoming repetitions']}
        >
          <tr>
            <td>
              {
                this.state.books
                  .filter(v => !v.end_date && moment().isAfter(v.start_date))
                  .map(book => <div className='pt1' key={book.id}>{book.title}</div>)
              }
            </td>
            <td>
              <table>
                <tbody>
                  {getAllReps(this.state.books).map((rep, i) => {
                    return moment().isBefore(rep.date) && <tr key={i}>
                      <td className='tooltip' data-info={moment(rep.date).format(DATE_FORMAT)}>
                        {moment(rep.date).fromNow(true)}
                      </td>
                      <td>{rep.title}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </td>
          </tr>
        </Table>
        <Calendar
          ranges={this.state.books.map(book => {
            return {start: book.start_date, end: book.end_date, name: book.title}
          })}
          points={this.state.books.map(book => {
            return {name: book.title, points: [book.rep_1, book.rep_2, book.rep_3]}
          })}
        />
        <input type='text' placeholder='filter' value={this.state.searchInputVal} onChange={e => {
          this.setState({searchInputVal: e.target.value})
        }} />
        <Table
          headers={['Title', 'Start', 'End', 'Reps', 'Actions']}
        >
          {this.getBooks().map(book =>
            <Book
              key={book.id}
              book={book}
              deleteHandler={this.deleteBook}
              updateHandler={data => this.updateBook(book.id, data)}
              isEdited={this.state.editedBookId === book.id}
              onClickHandler={() => this.setState({editedBookId: book.id})}
            />
          )}
        </Table>
        <form onSubmit={this.createBook}>
          <input type='text' placeholder='title' value={this.state.createBookInputVal} onChange={e => {
            this.setState({createBookInputVal: e.target.value})
          }} />
          <input type='submit' value='add' className='ml1 ba b--black bg-transparent pointer' />
        </form>
      </div>
    )
  }
}

export default App
