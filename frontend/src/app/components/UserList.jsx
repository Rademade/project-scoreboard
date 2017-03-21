import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Chip from 'material-ui/Chip'

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}

const UserList = ({state}) => (
  <div style={styles.wrapper}>
    {state.users.map((user) =>(
      <Chip key={user.full_name}>
       {user.role}: {user.full_name}
      </Chip>)
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
