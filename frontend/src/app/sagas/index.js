import { fork } from 'redux-saga/effects';
import projectSaga from 'sagas/project';

export default function* rootSaga() {
  yield [
    fork(projectSaga)
  ];
}
