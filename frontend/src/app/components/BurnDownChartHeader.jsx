import React, {Component, PropTypes} from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import {connect} from 'react-redux'
import moment from 'moment'

const getProgress = (spring) => {
  return (spring.story_points.realized / spring.story_points.planned) * 100
}

const getSprintTimestamps = () => {
  return [
    moment().startOf('week').format('DD/MM'),
    moment().startOf('week').add(5, 'days').format('DD/MM')
  ].join(' - ')
}

const getSprintNumber = (sprint) => {
  return `Sprint ${sprint.number}`
}

const mapStateToProps = (state, ownProps) => ({
  state: ownProps
})

const BurnDownChartHeader = ({state}) => {
  if (state.project.sprint) {
    return (
      <div style={{marginBottom: 20}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2>{state.project.name}</h2>
          <h3>{getSprintNumber(state.project.sprint)}</h3>
          <span>{getSprintTimestamps()}</span>
        </div>
        <div style={{justifyContent: 'flex-end'}}>
          <LinearProgress mode="determinate" value={getProgress(state.project.sprint)}/>
        </div>
      </div>
    )
  } else {
    return (
      <div style={{marginBottom: 20}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2>{state.project.name}</h2>
        </div>
      </div>
    )
  }
}

BurnDownChartHeader.propTypes = {
  project: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps
)(BurnDownChartHeader)
