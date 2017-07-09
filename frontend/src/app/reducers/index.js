import { combineReducers } from 'redux-immutable';
import dashboardReducer from './dashboard';
import routingReducer from './routing';

export default combineReducers({
  dashboard: dashboardReducer,
  routing: routingReducer
});
