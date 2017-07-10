import initialState from 'store/config/initial-state';
import {
  LOCATION_CHANGE,
} from 'constants/routing';

export default function routingReducer(state = initialState.routing, action = {}) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.set('locationBeforeTransitions', action.payload);
    default:
      return state;
  }
}
