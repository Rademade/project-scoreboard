import React, {Component, PropTypes} from 'react'
import {Line} from 'react-chartjs-2'
import * as _ from 'lodash'

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}

class BurnDownChart extends Component {
  getData() {
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

  getOptions() {
    return {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  }

  getStoryPoints() {
    let points = this.props.project.sprint.storyPoints;
    return `SP: ${points.realized} / ${points.planned}`
  }

  render() {
    return (
      <div>
        <div style={styles.header}>
          <div>
            <h1>{this.props.project.name}</h1>
            <h3>Sprint №{this.props.project.sprint.number}</h3>
            <span>{this.props.project.sprint.timestemps}</span>
          </div>

          <div style={{justifyContent: 'flex-end'}}>
            <h1>{this.getStoryPoints()}</h1>
          </div>
        </div>

        <Line data={this.getData()} options={this.getOptions()}/>
      </div>
    )
  }
}

BurnDownChart.propTypes = {
  project: PropTypes.object.isRequired
};

export default BurnDownChart;
