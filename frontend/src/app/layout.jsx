import React from 'react'
import {browserHistory, Router} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {Provider} from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from 'components/Header'
import routes from './routes'
import store from 'store/index'

injectTapEventPlugin()

const history = syncHistoryWithStore(browserHistory, store)

const Layout = () => (
  <Provider store={store} key="provider">
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <Header/>
        <Router history={history} routes={routes}/>
      </div>
    </MuiThemeProvider>
  </Provider>
)

export default Layout
