import React from 'react'
import {createDevTools} from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import {browserHistory} from 'react-router'
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware, push} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from 'reducers'
import {fetchProjects, fetchProject} from 'actions/project'

const loggerMiddleware = createLogger()
const reduxRouterMiddleware = routerMiddleware(browserHistory)

export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow"/>
  </DockMonitor>
)

function reload(store) {
  _.each(store.getState().projectApp.projects, (project, index) =>
    setTimeout(() => store.dispatch(fetchProject(project.id)), 5000 * index)
  )
}

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      reduxRouterMiddleware,
      thunkMiddleware,
      // loggerMiddleware
    ),
    DevTools.instrument()
  )

  const store = createStore(
    reducers,
    initialState,
    enhancer
  )

  if (typeof window !== 'undefined') {
    store.dispatch(fetchProjects())
    setInterval(() => reload(store), 60000)
  }

  return store
}
