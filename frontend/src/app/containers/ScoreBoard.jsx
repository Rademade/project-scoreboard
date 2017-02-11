import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import BurnDownChart from 'components/BurnDownChart'
import * as _ from 'lodash'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 25
  },
  gridList: {
    width: '100%'
  },
  gridTile: {
    padding: 10
  }
};

const projects = [
  {
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
  }
];

export default class ScoreBoard extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <GridList cellHeight={350} style={styles.gridList}>
          {projects.map((project) => (
            <GridTile key={project.name} style={styles.gridTile}>
              <BurnDownChart project={project}/>
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}
