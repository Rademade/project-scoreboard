import React from 'react'
import {connect} from 'react-redux'
import {GridList} from 'material-ui/GridList'
import Tile from 'components/Tile'
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
  }
}

const mapStateToProps = (state, ownProps) => ({
  state
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

const ScoreBoard = ({state, actions}) => (
  <div style={styles.root}>
    <GridList cellHeight={500} style={styles.gridList}>
      {state.projects.map(
        (project) => (<Tile key={project.name} project={project} key={project.id} key={project.id}/>)
      )}
    </GridList>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreBoard)
