import React, {Component} from 'react'
import {connect} from 'react-redux'
import BurnDownChartHeader from 'components/BurnDownChartHeader'
import BurnDownChartBody from 'components/BurnDownChartBody'
import {GridList, GridTile, Paper} from 'material-ui'

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

const mapStateToProps = (state, ownProps) => ({
  state: state.projectApp
})

const ScoreBoard = ({state, actions}) => (
  <div style={styles.root}>
    <GridList cellHeight={400} cols={3} padding={20} style={styles.gridList}>
      {state.projects.map(project =>
        (<GridTile key={project.id}>
          <Paper style={styles.paper}>
            <BurnDownChartHeader project={project}/>
            <BurnDownChartBody project={project}/>
          </Paper>
        </GridTile>)
      )}
    </GridList>
  </div>
)

export default connect(
  mapStateToProps
)(ScoreBoard)
