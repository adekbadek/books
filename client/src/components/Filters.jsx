// @flow

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'

import { borderButtonClasses } from 'utils/styling.js'
import { FILTERS, FILTER_NAMES, filterWithType } from 'utils/filters.js'
import actions from 'store/actions'

const { setFilterInput, setFilterType } = actions

const Filters = () => {
  const books = useSelector(state => state.books.books)
  const filterType = useSelector(state => state.ui.filterType)
  const dispatch = useDispatch()
  const [inputVal, setInputVal] = useState('')

  const handleFilterInputChange = (value: string) =>
    dispatch(setFilterInput(value))
  const handleFilterInputChangeDebounced = debounce(handleFilterInputChange)
  const handleInputChange = ({ target }: SyntheticInputEvent) => {
    setInputVal(target.value)
    handleFilterInputChangeDebounced(target.value)
  }

  return (
    <div className='mt2 flex items-center justify-between'>
      <div className='dib'>
        {FILTER_NAMES.map((type, i) => {
          const howManyFiltered = filterWithType(type, books).length
          return (
            <button
              className={`${borderButtonClasses} mr2 ${
                filterType === type ? 'button--active' : ''
              }`}
              key={i}
              onClick={() => {
                dispatch(setFilterType(type))
              }}
            >
              {`${FILTERS[type].label} (${howManyFiltered})`}
            </button>
          )
        })}
      </div>
      <input
        className='ph2 pv1'
        type='text'
        placeholder='filter'
        value={inputVal}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default Filters
