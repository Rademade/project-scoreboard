import React from 'react';
import { connect } from 'react-redux';
import BurnDownChartHeader from 'components/BurnDownChartHeader';
import BurnDownChartBody from 'components/BurnDownChartBody';
import { GridList, GridTile, Paper } from 'material-ui';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    margin: 0,
    width: '100%',
    height: '50%'
  },
  tile: {
    height: '100%',
    padding: 10,
    boxSizing: 'border-box'
  },
  paper: {
    padding: 20
  }
};

const mapStateToProps = (state, ownProps) => ({
  state: state.get('dashboard').toJS()
});

const DashBoard = ({state, actions}) => (
  <div style={styles.root}>
    <GridList cellHeight={window.innerHeight / 2} cols={3} padding={0} style={styles.gridList}>
      {state.projects.map((project) =>
        (<GridTile style={styles.tile} key={project.id}>
          <Paper style={styles.paper}>
            <BurnDownChartHeader project={project}/>
            <BurnDownChartBody project={project}/>
          </Paper>
        </GridTile>)
      )}
    </GridList>
  </div>
);

export default connect(
  mapStateToProps
)(DashBoard);
