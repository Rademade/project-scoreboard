import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_REQUEST_SUCCESS,
  FETCH_PROJECTS_REQUEST_FAILURE
} from 'constants';

export function projectReducer(state, action) {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return state;
    case FETCH_PROJECTS_REQUEST_SUCCESS:
      console.log('FETCH_PROJECTS_REQUEST_SUCCESS', action)
      return action.projects;
    case FETCH_PROJECTS_REQUEST_FAILURE:
      console.log('FETCH_PROJECTS_REQUEST_FAILURE', action)
      return state;
    default:
      return state;
  }
}
