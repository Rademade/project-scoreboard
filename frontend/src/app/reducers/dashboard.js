import initialState from 'store/config/initial-state';
import {
  GET_PROJECTS_REQUEST_SUCCESS,
  GET_PROJECTS_REQUEST_FAILURE,
  GET_PROJECT_REQUEST_SUCCESS,
  GET_PROJECT_REQUEST_FAILURE
} from 'constants/dashboard';

import * as _ from 'lodash';

export default function appReducer(state = initialState.dashboard, action = {}) {
  let projects = []

  switch (action.type) {
    case GET_PROJECTS_REQUEST_SUCCESS:
      return state.set('projects', action.payload);
    case GET_PROJECTS_REQUEST_FAILURE:
      return state.set('error', error);
    case GET_PROJECT_REQUEST_SUCCESS:
      projects = state.toJS().projects.map((project) => {
        return project.id == action.payload.id
          ? Object.assign(project, action.payload, { error: null })
          : project;
      })

      projects = _.orderBy(projects, project => {
        return project.sprint;
      }, ['asc'])

      projects =  _.orderBy(projects, project => {
        return project.sprint ? project.sprint.progress : 0;
      }, ['desc'])

      projects = _.orderBy(projects, project => {
        return project.sprint ? project.sprint.error : false;
      }, ['desc']);

      return state.set('projects', projects).delete('error');
    case GET_PROJECT_REQUEST_FAILURE:
      return state.updateIn(['projects'], (projects) => {
        return projects.map((project) => {
          return project.id == action.payload.id
            ? Object.assign(project, { error: action.payload.error })
            : project;
        });
      });
    default:
      return state;
  }
}
