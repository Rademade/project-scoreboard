import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import projectApp from 'reducers/project'

export default combineReducers({
  routing: routerReducer,
  projectApp: projectApp
})
