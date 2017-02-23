import {
  API_ENDPOINT,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_REQUEST_SUCCESS,
  FETCH_PROJECTS_REQUEST_FAILURE
} from 'constants'

function requestProjects() {
  return {
    type: FETCH_PROJECTS_REQUEST
  }
}

function fetchProjectsSuccess(projects) {
  return {
    type: FETCH_PROJECTS_REQUEST_SUCCESS,
    payload: projects
  };
}

function fetchProjectsFailure(error) {
  return {
    type: FETCH_PROJECTS_REQUEST_FAILURE,
    payload: error
  };
}

export function fetchProjects(dispatch) {
  return dispatch => {
    dispatch(requestProjects())

    return fetch(`${API_ENDPOINT}/projects`).then(
      (response) => response.json(),
      (error) =>  error.json()
    ).then((projects) => dispatch({
      type: FETCH_PROJECTS_REQUEST_SUCCESS,
      projects: projects
    })).catch((error) => dispatch({
      type: FETCH_PROJECTS_REQUEST_FAILURE,
      error: error
    }));
  }
}
