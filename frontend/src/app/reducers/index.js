import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import projectReducer from 'reducers/project'

export default combineReducers({
  routing: routerReducer,
  projectApp: projectReducer
})
