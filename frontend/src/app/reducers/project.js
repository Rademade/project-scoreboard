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
      let projects = _.map(action.projects, (project) => {
        let planned = _.sumBy(project.current_sprint.issues, 'story_points')
        let realized = _.sumBy(_.filter(project.current_sprint.issues, (issue) => {
          return issue.status == 'Done'
        }), 'story_points')

        project.current_sprint.story_points = {
          planned: planned,
          realized: realized
        }

        project.current_sprint.progress = realized / planned
        return project
      });

      return {
        projects: _.orderBy(projects, (project) => { return project.current_sprint.progress }, ['desc'])
      }
    case FETCH_PROJECTS_REQUEST_FAILURE:
      return {
        error: action.error.toString()
      }
    default:
      return state
  }
}
