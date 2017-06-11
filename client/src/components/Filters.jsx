// @flow

import type { FiltersProps } from 'utils/types'

import React from 'react'
import { connect } from 'react-redux'

import { borderButtonClasses } from 'utils/styling.js'
import { FILTERS, FILTER_NAMES } from 'utils/filters.js'
import actions from 'store/actions'
const { setFilterInput, setFilterType } = actions

// TODO: define FiltersProps here (proptypes bug?)

const Filters = (props: FiltersProps) => {
  const handleInputChange = e => {
    props.setFilterInput(e.target.value)
  }
  return (
    <div className='mt2'>
      <div className='dib'>
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
      <input className='fr' type='text' placeholder='filter' value={props.filterInput || ''} onChange={handleInputChange} />
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
