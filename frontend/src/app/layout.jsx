import React from 'react'
import {browserHistory, Router} from 'react-router'
import {Provider} from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {grey500} from 'material-ui/styles/colors';
import Header from 'components/Header'
import routes from './routes'

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  appBar: {
    height: 55,
    color: grey500
  },
});

export default class Layout extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header/>
          <Router history={browserHistory} routes={routes}/>
        </div>
      </MuiThemeProvider>
    )
  }
}
