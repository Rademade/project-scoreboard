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
        <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '10px'}}>
          <span style={{fontSize: '24px', color: '#2ec783', lineHeight: '32px'}}>{state.project.name}</span>
          <span style={{fontSize: '18px', color: '#4d4d4d', lineHeight: '36px', fontWeight: '300'}}>{getSprintNumber(state.project.sprint)}</span>
          <span style={{fontSize: '13px', color: '#9e9e9e', lineHeight: '38px'}}>{getSprintTimestamps()}</span>
        </div>
        <div style={{justifyContent: 'flex-end'}}>
          <LinearProgress mode="determinate" value={getProgress(state.project.sprint)} color={'#2ec783'}/>
        </div>
      </div>
    )
  } else {
    return (
      <div style={{marginBottom: 20}}>
        <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '10px'}}>
          <span style={{fontSize: '24px', color: '#2ec783'}}>{state.project.name}</span>
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
