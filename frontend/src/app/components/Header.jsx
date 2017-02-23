import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import {browserHistory} from 'react-router'

const Header = () => (
  <AppBar
    title={'Score board'}
    onLeftIconButtonTouchTap={() => browserHistory.push('/')}
    onTitleTouchTap={() => browserHistory.push('/')}
  />
)

export default Header;
