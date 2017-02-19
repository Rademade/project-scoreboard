import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Line} from 'react-chartjs-2'
import moment from 'moment'
import * as _ from 'lodash'

const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

const getSprintChartData = (sprint) => {
  var started_at = moment(sprint.timestamps.started_at);
  var ended_at = moment(sprint.timestamps.ended_at);
  var diff = ended_at.diff(started_at, 'days');
  var labels = _.map(_.range(diff + 1), (i) => {
    return (i == 0) ? started_at.format("ddd D") : started_at.add(1, 'days').format("ddd D");
  });

  return {
    labels: labels,
    datasets: [{
      type: 'line',
      label: 'Burndown',
      data: _.map(_.range(7), (i) => { return _.random(0, 10) }),
      fill: false,
      lineTension: 0
    }]
  }
}

const BurnDownChart = ({state}) => (
  <Line data={getSprintChartData(state.project.current_sprint)} options={options}/>
)

const mapStateToProps = (state, ownProps) => ({
  state: ownProps
})

BurnDownChart.propTypes = {
  project: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps
)(BurnDownChart)
