import { fromJS } from 'immutable';

const initialState = fromJS({
  dashboard: {
    projects: []
  },
  routing: {
    locationBeforeTransitions: null
  }
});

export default initialState;
