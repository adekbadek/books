import React from 'react'
import { connect } from 'react-redux'

import { borderButtonClasses } from 'utils/styling.js'
import { FILTERS, FILTER_NAMES } from 'utils/aux.js'
import actions from 'store/actions'
const { setFilterInput, setFilterType } = actions

@connect(
  state => ({
    filterInput: state.books.filterInput,
    filterType: state.books.filterType,
  }),
  { setFilterInput, setFilterType }
)
export default class Filters extends React.Component {
  handleInputChange = e => {
    this.props.setFilterInput(e.target.value)
  }
  handleFilterTypeChange = type => {
    this.props.setFilterType(type)
  }
  render () {
    return (
      <div>
        <input type='text' placeholder='filter' value={this.props.filterInput || ''} onChange={this.handleInputChange} />
        <div className='mt2'>
          {FILTER_NAMES.map((name, i) => (
            <button
              className={`${borderButtonClasses} mr2 ${this.props.filterType === name ? 'filter--active' : ''}`}
              key={i}
              onClick={() => { this.handleFilterTypeChange(name) }}
            >
              {FILTERS[name].label}
            </button>
          ))}
        </div>
      </div>
    )
  }
}
