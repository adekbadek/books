import React from 'react'
import { connect } from 'react-redux'

import { borderButtonClasses } from 'utils/styling.js'
import { FILTERS, FILTER_NAMES } from 'utils/aux.js'
import actions from 'store/actions'
const { setFilterInput, setFilterType } = actions

const Filters = props => {
  const handleInputChange = e => {
    props.setFilterInput(e.target.value)
  }
  return (
    <div>
      <input type='text' placeholder='filter' value={props.filterInput || ''} onChange={handleInputChange} />
      <div className='mt2'>
        {FILTER_NAMES.map((name, i) => (
          <button
            className={`${borderButtonClasses} mr2 ${props.filterType === name ? 'filter--active' : ''}`}
            key={i}
            onClick={() => { props.setFilterType(name) }}
          >
            {FILTERS[name].label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default connect(
  state => ({
    filterInput: state.books.filterInput,
    filterType: state.books.filterType,
  }),
  { setFilterInput, setFilterType }
)(Filters)
