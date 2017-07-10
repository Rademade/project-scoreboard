import { createLogger } from 'redux-logger';

export default function configureLogger() {
  const logger = createLogger({
    collapsed: true,
    stateTransformer: (state) => state.toJS()
  })

  return logger;
}
