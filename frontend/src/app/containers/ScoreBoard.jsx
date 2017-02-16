import React from 'react'
import { connect } from 'react-redux'
import {GridList, GridTile} from 'material-ui/GridList'
import BurnDownChart from 'components/BurnDownChart'
import * as Actions from 'actions'
import * as _ from 'lodash'
import {
  API_ENDPOINT
} from 'constants'

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
}

const mapStateToProps = (state, ownProps) => ({
  state
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

const ScoreBoard = ({state, actions}) => (
  <div style={styles.root}>
    <GridList cellHeight={450} style={styles.gridList}>
      {state.projects.map((project) => (
        <GridTile key={project.name} style={styles.gridTile}>
          <BurnDownChart project={project}/>
        </GridTile>)
      )}
    </GridList>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreBoard)
