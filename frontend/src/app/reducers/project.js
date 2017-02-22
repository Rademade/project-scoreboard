import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_REQUEST_SUCCESS,
  FETCH_PROJECTS_REQUEST_FAILURE
} from 'constants'
import * as _ from 'lodash'

export function projectReducer(state, action) {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return state;
    case FETCH_PROJECTS_REQUEST_SUCCESS:
      let projects = _.map(action.projects, (project) => {
        if (project.sprint) {
          let planned = _.sumBy(project.sprint.issues, 'story_points');
          let realized = _.sumBy(_.filter(project.sprint.issues, (issue) => {
            return issue.status == 'Done';
          }), 'story_points');

          project.sprint.story_points = {
            planned: planned,
            realized: realized
          }

          project.sprint.issues = _.map(project.sprint.issues, (issue) => {
            let date = new Date(issue.updated);
            date.setHours(0, 0, 0, 0);
            issue.updated = new Date(date);
            return issue;
          });

          project.sprint.progress = realized / planned;
        }

        return project;
      });

      projects =  _.orderBy(projects, (project) => {
        return project.sprint ? project.sprint.progress : 0;
      }, ['desc']);

      return {
        projects: projects
      }
    case FETCH_PROJECTS_REQUEST_FAILURE:
      return {
        error: action.error.toString()
      }
    default:
      return state
  }
}
