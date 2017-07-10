import configureStore from './config/store';
import configureHistory from './config/history';
import initialState from './config/initial-state';

const store = configureStore(initialState);
const history = configureHistory(store);

export { store, history };
