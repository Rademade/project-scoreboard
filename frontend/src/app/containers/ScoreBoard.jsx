import React from 'react'
import {connect} from 'react-redux'
import {GridList, GridTile} from 'material-ui/GridList'
import CircularProgress from 'material-ui/CircularProgress'
import BurnDownChart from 'components/BurnDownChart'
import BurnDownChartHeader from 'components/BurnDownChartHeader'
import UserList from 'components/UserList'
import {API_ENDPOINT} from 'constants'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 20
  },
  gridList: {
    width: '100%'
  },
  gridTile: {
    padding: 10
  }
}

const mapStateToProps = (state, ownProps) => ({
  state
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

const ScoreBoard = ({state, actions}) => (
  <div style={styles.root}>
    {state.loading &&
      <CircularProgress size={80} thickness={5} style={{paddingTop: 200}}/>
    }

    <GridList cellHeight={500} style={styles.gridList}>
      {state.projects.map((project) => (
        <GridTile key={project.name} style={styles.gridTile}>
          <BurnDownChartHeader project={project}/>
          <BurnDownChart project={project}/>
          <UserList users={project.users}/>
        </GridTile>)
      )}
    </GridList>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreBoard)
