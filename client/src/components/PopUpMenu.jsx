// @flow

import React from 'react'
import withClickOutSide from 'react-click-outside'

import { borderButtonClasses } from 'utils/styling.js'
import Icon from 'components/Icon'

@withClickOutSide
export default class PopUpMenu extends React.Component {
  state = {
    open: false,
  }
  close = () => {
    this.setState({ open: false })
  }
  handleClickOutside = this.close
  render () {
    return (
      <div className='popup'>
        <button
          className={borderButtonClasses}
          onClick={() =>
            this.setState(prevState => ({ open: !prevState.open }))
          }
        >
          <Icon name={this.state.open ? 'x' : 'menu'} />
        </button>
        {this.state.open && (
          <div className='popup__content pa1 ba b--black' onClick={this.close}>
            {this.props.children}
          </div>
        )}
      </div>
    )
  }
}
