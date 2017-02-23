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
  let groups = _.map(_.groupBy(sprint.issues, (issue) => {
    return issue.resolution_date;
  }), (issues, date) => {
    return {
      date: date,
      issues: issues,
      story_points: {
        realized: _.sumBy(issues, 'story_points')
      }
    }
  });

  groups = _.sortBy(groups, (group) => {
    return new Date(group.date);
  });

  let labels = _.map(groups, (group) => {
    return moment(group.date).format("ddd D");
  });

  let data = _.map(groups, (group) => {
    return group.story_points.realized
  });

  return {
    labels: labels,
    datasets: [{
      type: 'line',
      label: 'Stoty points',
      data: data,
      fill: false,
      lineTension: 0
    }]
  }
}

const BurnDownChart = ({state}) => (
  state.project.sprint
    ? (<Line data={getSprintChartData(state.project.sprint)} options={options}/>)
    : (<h1>No Active Sprint</h1>)
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
