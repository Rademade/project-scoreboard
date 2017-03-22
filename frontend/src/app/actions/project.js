import axios from 'axios'
import * as _ from 'lodash'
import {
  API_ENDPOINT,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_REQUEST_SUCCESS,
  FETCH_PROJECTS_REQUEST_FAILURE,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_REQUEST_SUCCESS,
  FETCH_PROJECT_REQUEST_FAILURE
} from 'constants'

function requestProject(projectId) {
  return {
    type: FETCH_PROJECT_REQUEST,
    payload: {
      projectId
    }
  }
}

function requestProjectSuccess(project) {
  console.log(project, 'project')

  return {
    type: FETCH_PROJECT_REQUEST_SUCCESS,
    payload: {
      project
    }
  }
}

function requestProjectFailure(error, projectId) {
  return {
    type: FETCH_PROJECT_REQUEST_FAILURE,
    payload: {
      error,
      projectId
    }
  }
}

function requestProjects() {
  return {
    type: FETCH_PROJECTS_REQUEST
  }
}

function fetchProjectsSuccess(projects) {
  return {
    type: FETCH_PROJECTS_REQUEST_SUCCESS,
    payload: {
      projects
    }
  }
}

function fetchProjectsFailure(error) {
  return {
    type: FETCH_PROJECTS_REQUEST_FAILURE,
    payload: {
      error
    }
  }
}

export function fetchProjects() {
  return dispatch => {
    dispatch(requestProjects());

    return axios.get(
      `${API_ENDPOINT}/projects`
    ).then(response => {
      dispatch(fetchProjectsSuccess(response.data))

      _.each(response.data, project => {
        dispatch(fetchProject(project.id))
      })
    }).catch(
      error => dispatch(fetchProjectsFailure(error))
    )
  }
}

export function fetchProject(id) {
  return dispatch => {
    dispatch(requestProject(id));

    return axios.get(
      `${API_ENDPOINT}/projects/${id}`
    ).then(
      response => dispatch(requestProjectSuccess(response.data))
    ).catch(
      error => dispatch(requestProjectFailure(error, id))
    )
  }
}
