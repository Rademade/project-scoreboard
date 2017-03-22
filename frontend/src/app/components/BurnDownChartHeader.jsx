import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

const styles = {
  display: 'flex',
  justifyContent: 'space-between'
}

const getSprintProgress = (sprint) => {
  return sprint
    ? `SP: ${sprint.story_points.realized} / ${sprint.story_points.planned}`
    : 'SP: 0 / 0'
}

const getSprintTimestamps = (sprint) => {
  return sprint ? [
    moment(sprint.timestamps.started_at).format('D/M'),
    moment(sprint.timestamps.ended_at).format('D/M')
  ].join(' - ') : ''
}

const getSprintNumber = (sprint) => {
  return sprint ? `Sprint ${sprint.number}` : ''
}

const BurnDownChartHeader = ({state}) => (
  <div style={styles}>
    <div>
      <h2>{state.project.name}</h2>
      <h3>{getSprintNumber(state.project.sprint)}</h3>
      <span>{getSprintTimestamps(state.project.sprint)}</span>
    </div>
    <div style={{justifyContent: 'flex-end'}}>
      <h2>{getSprintProgress(state.project.sprint)}</h2>
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
