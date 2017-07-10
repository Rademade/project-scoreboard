import React from 'react';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import reducers from 'reducers';
import sagas from 'sagas';
import dashboard from 'actions/dashboard';
import configureLogger from 'store/config/logger';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const reduxRouterMiddleware = routerMiddleware(browserHistory);
  const middleware = [
    thunkMiddleware,
    sagaMiddleware,
    reduxRouterMiddleware
  ];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(configureLogger());
  }

  const enhancer = applyMiddleware.apply(this, middleware);
  const store = createStore(
    reducers,
    initialState,
    enhancer
  );

  sagaMiddleware.run(sagas);

  if (typeof window !== 'undefined') {
    store.dispatch(dashboard.getProjects());
  }

  return store;
}
