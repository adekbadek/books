// @flow

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'

import Button from 'components/Button'
import Input from 'components/forms/Input'
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
  const handleInputChange = (value: string) => {
    setInputVal(value)
    handleFilterInputChangeDebounced(value)
  }

  return (
    <div className='mt2 flex items-center justify-between flex-wrap'>
      <div className='dib mb1'>
        {FILTER_NAMES.map((type, i) => {
          const howManyFiltered = filterWithType(type, books).length
          return (
            <Button
              isActive={filterType === type}
              className='mr3 mb3'
              key={i}
              onClick={() => dispatch(setFilterType(type))}
            >
              {`${FILTERS[type].label} (${howManyFiltered})`}
            </Button>
          )
        })}
      </div>
      <Input
        placeholder='filter'
        value={inputVal}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default Filters
