import React from 'react'
import {connect} from 'react-redux'
import BurnDownChart from 'components/BurnDownChart'
import BurnDownChartHeader from 'components/BurnDownChartHeader'
import UserList from 'components/UserList'
import {GridList, GridTile, CircularProgress, Paper} from 'material-ui'
import {API_ENDPOINT} from 'constants'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    overflowY: 'auto',
    marginTop: 20,
    marginBottom: 50,
    width: '100%'
  },
  paper: {
    padding: 20
  }
}

const BurnDownChartBody = ({project}) => {
  if (project.isPendingRequest && !project.isLoadedEvenOneTime) {
    return (<CircularProgress size={50} thickness={3}/>)
  } else {
    if (project.error) {
      return (<h2>{project.error}</h2>);
    } else {
      return (<div>
        <BurnDownChart project={project}/>
        {project.users && <UserList users={project.users}/>}
      </div>)
    }
  }
}

const Tile = ({project}) => (
  <Paper style={styles.paper}>
    <BurnDownChartHeader project={project}/>
    <BurnDownChartBody project={project}/>
  </Paper>
)

const mapStateToProps = (state, ownProps) => ({
  state: state.projectApp
})

const ScoreBoard = ({state, actions}) => (
  <div style={styles.root}>
    <GridList cellHeight={400} cols={3} padding={20} style={styles.gridList}>
      {state.projects.map(project =>
        (<GridTile key={project.id}>
          <Tile project={project}/>
        </GridTile>)
      )}
    </GridList>
  </div>
)

export default connect(
  mapStateToProps
)(ScoreBoard)
