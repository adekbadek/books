import React from 'react'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Book from 'components/Book'
import Calendar from 'components/Calendar'
import Table from 'components/Table'
import RouteLink from 'components/RouteLink'
import Filters from 'components/Filters'
import withUserInfo from 'components/hoc/withUserInfo'

import actions from 'store/actions'
const { setBooks } = actions

import {
  request,
  readCredentials,
  revokeCredentials,
  getBooksURL,
  getAuthViewURL,
  getUserSettingsViewURL,
} from 'utils/api.js'
import { getAllReps, FILTERS } from 'utils/aux.js'
import { DATE_FORMAT } from 'utils/time.js'

@connect(
  state => ({
    books: state.books.books,
    filterInput: state.books.filterInput,
    filterType: state.books.filterType,
  }),
  {setBooks}
)
@withUserInfo
export default class Main extends React.Component {
  state = {
    createBookInputVal: '',
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
      .then(book => {
        this.props.setBooks({books: this.props.books.concat([book])})
        this.setState({
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
      .then(books => books && this.props.setBooks({books}))
  }
  deleteBook = id => {
    request({
      url: getBooksURL(id),
      method: 'DELETE'
    })
      .then(() => {
        this.props.setBooks({books: this.props.books.filter(v => v.id !== id)})
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
    const query = this.props.filterInput
    const regexp = new RegExp(query, 'i')
    return this.props.books
      .filter(v => !query || v.title.match(regexp))
      .filter(FILTERS[this.props.filterType].predicate)
  }
  getTodaysReps () {
    return getAllReps(this.props.books).filter(rep => moment().isSame(rep.date, 'day'))
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
                this.props.books
                  .filter(v => !v.end_date && moment().isAfter(v.start_date))
                  .map(book => <div className='pt1' key={book.id}>{book.title}</div>)
              }
            </td>
            <td>
              <table>
                <tbody>
                  {getAllReps(this.props.books).map((rep, i) => {
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
          ranges={this.props.books.map(book => (
            {start: book.start_date, end: book.end_date, name: book.title}
          ))}
          points={this.props.books.map(book => (
            {name: book.title, points: [book.rep_1, book.rep_2, book.rep_3]}
          ))}
        />
        <Filters />
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
