import React, {Component, PropTypes} from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import {connect} from 'react-redux'
import moment from 'moment'

const getProgress = (spring) => {
  return spring
    ? (spring.story_points.realized / spring.story_points.planned) * 100
    : 0
}

const getSprintTimestamps = (sprint) => {
  return sprint ? [
    moment(sprint.started_at).format('D/M'),
    moment(sprint.ended_at).format('D/M')
  ].join(' - ') : ''
}

const getSprintNumber = (sprint) => {
  return sprint ? `Sprint ${sprint.number}` : ''
}

const BurnDownChartHeader = ({state}) => (
  <div style={{marginBottom: 20}}>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <h2>{state.project.name}</h2>
      <h3>{getSprintNumber(state.project.sprint)}</h3>
      <span>{getSprintTimestamps(state.project.sprint)}</span>
    </div>
    <div style={{justifyContent: 'flex-end'}}>
      <LinearProgress mode="determinate" value={getProgress(state.project.sprint)}/>
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  state: ownProps
})

BurnDownChartHeader.propTypes = {
  project: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps
)(BurnDownChartHeader)
