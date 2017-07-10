import React from 'react';
import { CircularProgress } from 'material-ui';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import UserList from 'components/UserList';
import chart from 'services/chart';

const mapStateToProps = (state, ownProps) => ({
  state: ownProps
});

const BurnDownChartBody = ({state}) => {
  if (state.project.error) {
    return <span style={{fontSize: '24px', color: '#4d4d4d'}}>{state.project.error}</span>;
  }

  if (state.project.sprint) {
    if (state.project.sprint.error) {
      return <span style={{fontSize: '24px', color: '#4d4d4d'}}>{state.project.sprint.error}</span>;
    } else {
      return (
        <div>
          <Line data={chart.getData(state.project.sprint)} options={chart.getOptions()}/>
          <UserList users={state.project.users}/>
        </div>
      );
    }
  }

  return <CircularProgress size={50} thickness={3} color={'#2ec783'}/>;
}

export default connect(
  mapStateToProps
)(BurnDownChartBody);
