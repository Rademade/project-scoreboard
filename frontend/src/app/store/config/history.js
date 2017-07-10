import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

export default function configureHistory(store) {
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => ({
      locationBeforeTransitions: state.getIn(['routing', 'locationBeforeTransitions'])
    })
  })

  return history;
}
