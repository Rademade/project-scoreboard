import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_REQUEST_SUCCESS,
  FETCH_PROJECTS_REQUEST_FAILURE,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_REQUEST_SUCCESS,
  FETCH_PROJECT_REQUEST_FAILURE
} from 'constants'
import initialState from 'store/initial-state'
import * as _ from 'lodash'

export default function projectApp(state = initialState.projectApp, action = {}) {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
      return {
        ...state,
        error: null,
        projects: _.map(state.projects, project => {
          return project.id == action.payload.projectId
            ? _.merge(project, {
              isPendingRequest: true
            })
            : project
        })
      }
    case FETCH_PROJECT_REQUEST_SUCCESS:
      let projects = _.map(state.projects, project => {
        return project.id == action.payload.project.id
          ? _.merge(project, action.payload.project, {
            isPendingRequest: false,
            isLoadedEvenOneTime: true
          })
          : project
      })

      projects = _.map(projects, (project) => {
        if (project.sprint) {
          project.sprint.issues = _.filter(project.sprint.issues, issue =>
            issue.story_points && issue.story_points > 0
          )

          if (project.sprint.issues.length > 0) {
            let planned = _.sumBy(project.sprint.issues, 'story_points');
            let realized = _.sumBy(_.filter(project.sprint.issues, (issue) => {
              return issue.status == 'Done'
            }), 'story_points')

            project.sprint.story_points = {
              planned: planned,
              realized: realized
            }

            project.sprint.issues = _.map(project.sprint.issues, (issue) => {
              let date = new Date(issue.resolution_date)
              date.setHours(0, 0, 0, 0)
              issue.resolution_date = new Date(date)
              return issue;
            });

            project.sprint.progress = realized / planned
          } else {
            project.sprint.progress = 0
            project.sprint.story_points = {
              planned: 1,
              realized: 0
            }
          }

        }; return project;
      });

      projects =  _.orderBy(projects, project => {
        return project.sprint ? project.sprint.progress : 0;
      }, ['desc']);

      projects = _.orderBy(projects, project => {
        return project.error
      }, ['desc'])

      return {
        ...state,
        error: null,
        projects: projects
      }
    case FETCH_PROJECT_REQUEST_FAILURE:
      return {
        ...state,
        projects: _.map(state.projects, project => {
          return project.id == action.payload.projectId
            ? _.merge(project, {
              error: action.payload.error.toString(),
              isPendingRequest: false,
              isLoadedEvenOneTime: true
            })
            : project
        })
      }
    case FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        isPendingRequest: true
      }
    case FETCH_PROJECTS_REQUEST_SUCCESS:
      return {
        ...state,
        projects: action.payload.projects,
        isPendingRequest: false
      }
    case FETCH_PROJECTS_REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isPendingRequest: false
      }
    default:
      return state
  }
}
