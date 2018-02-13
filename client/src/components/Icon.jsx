// @flow

import React from 'react'

export default ({name, style = {}} : {name: string, style?: {}}) =>
  <span
    className={`icon-${name} dib`}
    style={{fontSize: '18px', ...style}}
  />
