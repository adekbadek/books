import React from 'react'
import withClickOutSide from 'react-click-outside'

import { borderButtonClasses } from 'utils/styling.js'

@withClickOutSide
export default class PopUpMenu extends React.Component {
  state = {
    open: false,
  }
  handleClickOutside = () => {
    this.setState({ open: false })
  }
  render () {
    return (
      <div className='popup'>
        <button
          className={`${borderButtonClasses} popup__button`}
          onClick={() => this.setState(prevState => ({open: !prevState.open}))}
        >{this.state.open ? '×' : '☰'}</button>
        {this.state.open && (
          <div className='popup__content pa1 ba b--black'>
            {this.props.children}
          </div>
        )}
      </div>
    )
  }
}
