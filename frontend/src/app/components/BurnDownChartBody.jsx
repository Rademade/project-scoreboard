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
  if (!state.project.isLoadedEvenOneTime) return (<CircularProgress size={50} thickness={3}/>)
  if (state.project.error) return (<h2>{state.project.error}</h2>)
  return (state.project.sprint)
    ? (<div>
        <Line data={chart.getChartData(state.project.sprint)} options={options}/>
        <UserList users={state.project.users}/>
      </div>)
    : (<h1>No Active Sprint</h1>)
}

BurnDownChartBody.propTypes = {
  project: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps
)(BurnDownChartBody)
