import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import {browserHistory} from 'react-router'

class Header extends Component {
  render() {
    return (
      <AppBar
        title={'Scoreboard'}
        onLeftIconButtonTouchTap={() => browserHistory.push('/')}
        onTitleTouchTap={() => browserHistory.push('/')}
      />
    );
  }
}

export default Header;
