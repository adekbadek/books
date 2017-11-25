// @flow

import type { ActionFunction, Book } from 'utils/types'

import * as React from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'

import { borderButtonClasses } from 'utils/styling.js'
import { FILTERS, FILTER_NAMES } from 'utils/filters.js'
import actions from 'store/actions'

const { setFilterInput, setFilterType } = actions

type FiltersProps = {
  filterType: string,
  setFilterType: ActionFunction,
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
          {FILTER_NAMES.map((name, i) => (
            <button
              className={`${borderButtonClasses} mr2 ${filterType === name ? 'filter--active' : ''}`}
              key={i}
              onClick={() => { setFilterType(name) }}
            >
              {FILTERS[name].label}
            </button>
          ))}
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
    filterType: state.ui.filterType,
  }),
  { setFilterInput, setFilterType }
)(Filters)
