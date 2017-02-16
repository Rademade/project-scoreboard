import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {projectReducer} from 'reducers'

const loggerMiddleware = createLogger()
const initialState = {
  projects: []
  // projects: [{
  //   name: 'Ping-Pong',
  //   users: [],
  //   sprint: {
  //     number: _.random(1, 10),
  //     timestemps: '06/02 - 12/02',
  //     storyPoints: {
  //       planned: 60,
  //       realized: _.random(10, 60)
  //     }
  //   }
  // }]
}

let store = createStore(
  projectReducer,
  initialState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

export default store;
