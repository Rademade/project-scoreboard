import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {GridTile} from 'material-ui/GridList'
import BurnDownChart from 'components/BurnDownChart'
import BurnDownChartHeader from 'components/BurnDownChartHeader'
import UserList from 'components/UserList'
import CircularProgress from 'material-ui/CircularProgress'

const mapStateToProps = (state, ownProps) => ({
  state: ownProps
})

const Tile = ({state, actions}) => (
  <GridTile style={{padding: 10}}>
    <BurnDownChartHeader project={state.project}/>

    {(state.project.isPendingRequest)
      ? <CircularProgress size={80} thickness={5}/>
      : (

        (state.project.error)
          ? (<h2>{state.project.error}</h2>)
          : (<div>
            <BurnDownChart project={state.project}/>
            {state.project.users &&
              <UserList users={state.project.users}/>
            }
          </div>)
      )
    }
  </GridTile>
)

Tile.propTypes = {
  project: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps
)(Tile)
