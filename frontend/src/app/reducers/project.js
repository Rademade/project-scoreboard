import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_REQUEST_SUCCESS,
  FETCH_PROJECTS_REQUEST_FAILURE
} from 'constants'

import * as _ from 'lodash'

export function projectReducer(state, action) {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return state
    case FETCH_PROJECTS_REQUEST_SUCCESS:
      return {
        projects: action.projects
      }
    case FETCH_PROJECTS_REQUEST_FAILURE:
      return state
    default:
      return state
  }
}
