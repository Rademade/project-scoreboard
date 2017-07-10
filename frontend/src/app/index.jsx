import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'

import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { store, history } from 'store/index';
import routes from './routes';

injectTapEventPlugin()

const Index = () => (
  <Provider store={store} key="provider">
    <MuiThemeProvider>
      <div>
        <Router history={history} routes={routes}/>
      </div>
    </MuiThemeProvider>
  </Provider>
);

export default Index;
