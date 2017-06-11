// @flow

import React from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import { DATE_FORMAT } from 'utils/time.js'

export default (props: {}) =>
  <DatePicker
    dateFormat={DATE_FORMAT}
    locale='en-gb'
    isClearable
    {...props}
  />
