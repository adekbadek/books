// @flow

import type { ActionFunction, Book } from 'utils/types'

import * as React from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'

import { borderButtonClasses } from 'utils/styling.js'
import { FILTERS, FILTER_NAMES, filterWithType } from 'utils/filters.js'
import actions from 'store/actions'

const { setFilterInput, setFilterType } = actions

type FiltersProps = {
  filterType: string,
  setFilterType: ActionFunction,
  books: Array<Book>,
  filteredBooks: Array<Book>,
  setFilterInput: ActionFunction,
}

type FilterState = {
  inputVal: string,
}

class Filters extends React.Component {
  props: FiltersProps
  state: FilterState = {
    inputVal: '',
  }
  componentWillUnmount () {
    this.setFilterInput.cancel()
  }
  handleInputChange = ({ target }: SyntheticInputEvent) => {
    this.setState({inputVal: target.value})
    this.setFilterInput(target.value)
  }
  handleSettingFilterInput = (value: string) => this.props.setFilterInput(value)
  setFilterInput = debounce(this.handleSettingFilterInput)
  render () {
    const { filterType, setFilterType } = this.props
    return (
      <div className='mt2'>
        <div className='dib'>
          {FILTER_NAMES.map((type, i) => {
            const howManyFiltered = filterWithType(type, this.props.books).length
            return (
              <button
                className={`${borderButtonClasses} mr2 ${filterType === type ? 'filter--active' : ''}`}
                key={i}
                onClick={() => { setFilterType(type) }}
              >
                {`${FILTERS[type].label} (${howManyFiltered})`}
              </button>
            )
          })}
        </div>
        <input
          className='fr'
          type='text'
          placeholder='filter'
          value={this.state.inputVal}
          onChange={this.handleInputChange}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    books: state.books.books,
    filterType: state.ui.filterType,
  }),
  { setFilterInput, setFilterType }
)(Filters)
