import React, {Component, PropTypes} from 'react'
import {GridList, GridTile, CircularProgress, Paper} from 'material-ui'
import {connect} from 'react-redux'
import {Line, Chip} from 'react-chartjs-2'
import UserList from 'components/UserList'
import ChartService from 'services/chart'

const chart = new ChartService()
const options = {
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Story Points'
      }
    }]
  }
}

const mapStateToProps = (state, ownProps) => ({
  state: ownProps
})

const BurnDownChartBody = ({state}) => {
  if (state.project.isLoadedEvenOneTime) {
    if (state.project.error) return (<h2>{state.project.error}</h2>)
    if (state.project.sprint && state.project.sprint.issues && state.project.sprint.issues.length > 0) {
      return (
        <div>
          <Line data={chart.getChartData(state.project.sprint)} options={options}/>
          <UserList users={state.project.users}/>
        </div>
      )
    }

    return (<h1>No Active Sprint</h1>)
  } else {
    return (<CircularProgress size={50} thickness={3}/>)
  }
}

BurnDownChartBody.propTypes = {
  project: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps
)(BurnDownChartBody)
