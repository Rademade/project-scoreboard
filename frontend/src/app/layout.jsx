import React from 'react'
import {browserHistory, Router} from 'react-router'
import {Provider} from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from 'components/Header'
import routes from './routes'
import store from './store'
import {fetchProjects} from 'actions'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  appBar: {
    height: 55
  }
})

store.dispatch(fetchProjects())
setInterval(() => {
  store.dispatch(fetchProjects())
}, 60000)

const Layout = () => (
  <Provider store={store} key="provider">
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Header/>
        <Router history={browserHistory} routes={routes}/>
      </div>
    </MuiThemeProvider>
  </Provider>
)

export default Layout
