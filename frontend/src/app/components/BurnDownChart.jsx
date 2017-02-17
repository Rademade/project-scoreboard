import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Line} from 'react-chartjs-2'
import * as _ from 'lodash'

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}

const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  }
}

const getRandomChartData = () => {
  return {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [{
      type: 'line',
      label: 'Planned',
      data: _.map(_.range(1, 7), (i) => { return _.random(5, 25) }),
      fill: false,
      lineTension: 0
    }, {
      type: 'line',
      label: 'Realized',
      data: _.map(_.range(1, 7), (i) => { return _.random(5, 25) }),
      fill: false,
      lineTension: 0
    }]
  }
}

const getProgress = (sprint) => {
  var story_points = _.sumBy(sprint.issues, 'story_points')
  return `SP: 0 / ${story_points}`
}

const getTimestemps = (timestemps) => {
  return '06/02 - 12/02'
}

const BurnDownChart = ({state}) => (
  <div>
    <div style={styles.header}>
      <div>
        <h1>{state.project.name}</h1>
        <h3>Sprint №{state.project.current_sprint.number}</h3>
        <span>{getTimestemps(state.project.current_sprint.timestemps)}</span>
      </div>
      <div style={{justifyContent: 'flex-end'}}>
        <h1>{getProgress(state.project.current_sprint)}</h1>
      </div>
    </div>
    <Line data={getRandomChartData()} options={options}/>
  </div>
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
