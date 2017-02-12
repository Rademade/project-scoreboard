import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {projectReducer} from 'reducers'

const loggerMiddleware = createLogger()

const initialState = {
  projects: [{
    name: 'Ping-Pong',
    users: [],
    sprint: {
      number: _.random(1, 10),
      timestemps: '06/02 - 12/02',
      storyPoints: {
        planned: 60,
        realized: _.random(10, 60)
      }
    }
  }, {
    name: 'TimeCoin',
    users: [],
    sprint: {
      number: _.random(1, 10),
      timestemps: '06/02 - 12/02',
      storyPoints: {
        planned: 60,
        realized: _.random(10, 60)
      }
    }
  }, {
    name: 'StartLife',
    users: [],
    sprint: {
      number: _.random(1, 10),
      timestemps: '06/02 - 12/02',
      storyPoints: {
        planned: 60,
        realized: _.random(10, 60)
      }
    }
  }, {
    name: 'Droter',
    users: [],
    sprint: {
      number: _.random(1, 10),
      timestemps: '06/02 - 12/02',
      storyPoints: {
        planned: 60,
        realized: _.random(10, 60)
      }
    }
  }, {
    name: 'GCCS',
    users: [],
    sprint: {
      number: _.random(1, 10),
      timestemps: '06/02 - 12/02',
      storyPoints: {
        planned: 60,
        realized: _.random(10, 60)
      }
    }
  }, {
    name: 'Subj',
    users: [],
    sprint: {
      number: _.random(1, 10),
      timestemps: '06/02 - 12/02',
      storyPoints: {
        planned: 60,
        realized: _.random(10, 60)
      }
    }
  }, {
    name: 'Enguide',
    users: [],
    sprint: {
      number: _.random(1, 10),
      timestemps: '06/02 - 12/02',
      storyPoints: {
        planned: 60,
        realized: _.random(10, 60)
      }
    }
  }, {
    name: 'Health 24',
    users: [],
    sprint: {
      number: _.random(1, 10),
      timestemps: '06/02 - 12/02',
      storyPoints: {
        planned: 60,
        realized: _.random(10, 60)
      }
    }
  }]
}

let store = createStore(
  projectReducer,
  initialState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

export default store;
