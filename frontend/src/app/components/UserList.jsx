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

const User = ({user, isLast}) => (
  isLast ? (
    <div key={user.full_name} style={{marginRight: 5}}>
      <span>{user.role}: {user.full_name}</span>
    </div>
  ) : (
    <div key={user.full_name} style={{marginRight: 5}}>
      <span>{user.role}: {user.full_name}</span>,
    </div>
  )
)

const UserList = ({state}) => (
  <div style={styles.wrapper}>
    {state.users.map((user, index) =>
      <User user={user} isLast={(index == state.users.length - 1)} key={user.full_name}/>
    )}
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  state: ownProps
})

UserList.propTypes = {
  users: PropTypes.array.isRequired
}

export default connect(
  mapStateToProps
)(UserList)
