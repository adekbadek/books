import React from 'react'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

import Book from 'components/Book'
import Calendar from 'components/Calendar'
import Table from 'components/Table'
import RouteLink from 'components/RouteLink'
import withUserInfo from 'components/hoc/withUserInfo'

import {
  request,
  readCredentials,
  revokeCredentials,
  getBooksURL,
  getAuthViewURL,
  getUserSettingsViewURL,
} from 'utils/api.js'
import { getAllReps } from 'utils/aux.js'
import { DATE_FORMAT } from 'utils/time.js'

@withUserInfo
export default class Main extends React.Component {
  state = {
    books: [],
    createBookInputVal: '',
    searchInputVal: '',
    editedBookId: null,
    authenticated: !!readCredentials(),
  }
  createBook = (e) => {
    e.preventDefault()

    request({
      url: getBooksURL(),
      method: 'POST',
      data: {
        title: this.state.createBookInputVal,
      },
    })
      .then(res => res.json())
      .then((book) => {
        this.setState({
          books: this.state.books.concat([book]),
          createBookInputVal: ''
        })
      })
  }
  refreshBooks = () => {
    request({url: getBooksURL()})
      .then(res => {
        if (res.status === 401) {
          // TODO: handle unauthed
          console.log('unauthorized')
        } else if (res.status === 200) {
          return res.json()
        }
      })
      .then(books => books && this.setState({books}))
  }
  deleteBook = (id) => {
    request({
      url: getBooksURL(id),
      method: 'DELETE'
    })
      .then(() => {
        this.setState({
          books: this.state.books.filter(v => v.id !== id)
        })
      })
  }
  updateBook = (id, updatedBook) => {
    request({
      url: getBooksURL(id),
      method: 'PATCH',
      data: updatedBook,
    })
      .then(() => {
        this.refreshBooks()
        this.setState({editedBookId: null})
      })
  }
  componentDidMount () {
    this.refreshBooks()
  }
  getBooks = () => {
    const query = this.state.searchInputVal
    return this.state.books.filter(v => !query || v.title.match(new RegExp(query, 'i')))
  }
  getTodaysReps () {
    return getAllReps(this.state.books).filter(rep => moment().isSame(rep.date, 'day'))
  }
  render () {
    if (!this.state.authenticated) {
      return <Redirect to={getAuthViewURL()} />
    }

    const todaysReps = this.getTodaysReps()
    return (
      <div>
        <div className='top'>
          <h1 className='dib mt0'>books</h1>
          <RouteLink
            url={getAuthViewURL()}
            className='fr'
            borderButton
            beforeAction={revokeCredentials}
          >logout</RouteLink>
          <RouteLink
            url={getUserSettingsViewURL()}
            className='fr pa1 pr2'
          >{this.props.user.email}</RouteLink>
        </div>
        {!!todaysReps.length && (
          <Table
            wrapperClassName='pt2'
            headers={['Today\'s repetitions']}
          >
            {todaysReps.map((rep, i) => <tr key={i}><td>{rep.title}</td></tr>)}
          </Table>
        )}
        <Table
          wrapperClassName='pt4'
          tableClassName='table--align-top'
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
          ranges={this.state.books.map(book => (
            {start: book.start_date, end: book.end_date, name: book.title}
          ))}
          points={this.state.books.map(book => (
            {name: book.title, points: [book.rep_1, book.rep_2, book.rep_3]}
          ))}
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
