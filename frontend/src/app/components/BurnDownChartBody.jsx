import React, {Component, PropTypes} from 'react'
import {GridList, GridTile, CircularProgress, Paper} from 'material-ui'
import {connect} from 'react-redux'
import {Line, Chip} from 'react-chartjs-2'
import UserList from 'components/UserList'
import ChartService from 'services/chart'

const chart = new ChartService()
const options = {
  animation : false,
  scaleShowLabels : false,
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  },
  scales: {
    yAxes: [{
      scaleLabel: {
        display: false,
        labelString: 'Story Points'
      },
      ticks: {
        beginAtZero: true
      }
    }]
  },
  legend: {
    display: false
  }
}

const mapStateToProps = (state, ownProps) => ({
  state: ownProps
})

const BurnDownChartBody = ({state}) => {
  if (state.project.isLoadedEvenOneTime) {
    if (state.project.error) return (<span style={{fontSize: '24px', color: '#4d4d4d'}}>{state.project.error}</span>)
    if (state.project.sprint && state.project.sprint.issues && state.project.sprint.issues.length > 0) {
      return (
        <div>
          <Line data={chart.getChartData(state.project.sprint)} options={options}/>
          <UserList users={state.project.users}/>
        </div>
      )
    }

    return (<span style={{fontSize: '24px', color: '#4d4d4d'}}>No Active Sprint</span>)
  } else {
    return (<CircularProgress size={50} thickness={3} color={'#2ec783'}/>)
  }
}

BurnDownChartBody.propTypes = {
  project: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps
)(BurnDownChartBody)
