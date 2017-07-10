import {
  GET_PROJECTS_REQUEST,
  GET_PROJECT_REQUEST
} from 'constants/dashboard';

const getProjects = (_) => (dispatch) => dispatch({
  type: GET_PROJECTS_REQUEST
});

const getProject = (id) => (dispatch) => dispatch({
  type: GET_PROJECT_REQUEST,
  payload: id
});

const update = (dt = 0) => (dispatch, getState) => {
  const projects = getState().get('dashboard').toJS().projects;

  projects.forEach((project, index) => {
    setTimeout((_) => {
      dispatch(getProject(project.id));
    }, (dt / projects.length)  * index);
  });
}

export default {
  initialize: (dt = 60000) => (dispatch, getState) => {
    update()(dispatch, getState);

    setInterval((_) => {
      update(dt)(dispatch, getState);
    }, dt);
  },
  getProjects: getProjects,
  getProject: getProject
}
