import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from 'react-redux';
import moment from 'moment';

const getSprintTimestamps = (sprint) => {
  return [
    moment(sprint.started_at).format('DD/MM'),
    moment(sprint.ended_at).format('DD/MM')
  ].join(' - ')
}

const mapStateToProps = (state, ownProps) => ({
  state: ownProps
});

const BurnDownChartHeader = ({state}) => {
  if (state.project.sprint) {
    return (
      <div style={{marginBottom: 20}}>
        <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '10px'}}>
          <span style={{fontSize: '24px', color: '#2ec783', lineHeight: '32px'}}>{state.project.name}</span>
          <span style={{fontSize: '18px', color: '#4d4d4d', lineHeight: '36px', fontWeight: '300'}}>{state.project.sprint.name}</span>
          <span style={{fontSize: '13px', color: '#9e9e9e', lineHeight: '38px'}}>{getSprintTimestamps(state.project.sprint)}</span>
        </div>
        <div style={{justifyContent: 'flex-end'}}>
          <LinearProgress mode="determinate" value={state.project.sprint.progress} color={'#2ec783'}/>
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

export default connect(
  mapStateToProps
)(BurnDownChartHeader);
