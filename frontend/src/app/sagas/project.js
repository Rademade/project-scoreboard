import { call, put, takeEvery } from 'redux-saga/effects';
import api from 'api/project';
import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_REQUEST_SUCCESS,
  GET_PROJECTS_REQUEST_FAILURE,
  GET_PROJECT_REQUEST,
  GET_PROJECT_REQUEST_SUCCESS,
  GET_PROJECT_REQUEST_FAILURE
} from 'constants/dashboard';

import dashboard from 'actions/dashboard';

function* _getProjects(action) {
  try {
    const request = yield call(api.query);

    yield put({
      type: GET_PROJECTS_REQUEST_SUCCESS,
      payload: request.data
    });

    yield put(dashboard.initialize());
  } catch (e) {
    yield put({
      type: GET_PROJECTS_REQUEST_FAILURE,
      payload: e.message
    });
  }
}

function* _getProject(action) {
  try {
    const request = yield call(api.get, action.payload);

    yield put({
      type: GET_PROJECT_REQUEST_SUCCESS,
      payload: request.data
    });
  } catch (e) {
    yield put({
      type: GET_PROJECT_REQUEST_FAILURE,
      payload: {
        id: action.payload,
        error: e.message
      }
    });
  }
}

function* projectSaga() {
  yield takeEvery(GET_PROJECTS_REQUEST, _getProjects);
  yield takeEvery(GET_PROJECT_REQUEST, _getProject);
}

export default projectSaga;
