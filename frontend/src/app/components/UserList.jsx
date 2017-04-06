import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

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

const UserList = ({state}) => (
  <div style={styles.wrapper}>
    {state.users.map((user) =>(
      <span key={user.full_name}>
       {user.role}: {user.full_name}
      </span>)
    )}
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  state: ownProps
})

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps
)(UserList)
