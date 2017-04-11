import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as _ from 'lodash'

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    paddingTop: '20px',
    color: '#4d4d4d',
    fontSize: '13px'
  }
}

const UserList = ({state}) => {
  let groups = _.groupBy(state.users, 'role');

  return (<div style={styles.wrapper}>
    { _.map(groups, ((users) => {
      let roleName = _.first(users).role;
      let usersCount = users.length;
      let i = 0;

      return (<span key={roleName}>
        <span style={{ marginRight: '5px'}}>{roleName}:</span>
        { users.map(user => {
          ++i;
          let sign = usersCount == i ? '' : ',';
          return (<span style={{marginRight: '5px'}} key={user.full_name}>
            {user.full_name}{sign}
          </span>)
        }) }
      </span>)
    }) ) }
  </div>)
}

const mapStateToProps = (state, ownProps) => ({
  state: ownProps
})

UserList.propTypes = {
  users: PropTypes.array.isRequired
}

export default connect(
  mapStateToProps
)(UserList)
