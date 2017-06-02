import React, { Component } from 'react'
import { connect } from 'react-redux'

import { logoutUser } from '../actions'

class Logout extends Component {
  render() {
    return (
      <button onClick={this.props.logoutUser} className="btn btn-primary">
        Logout
      </button>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(logoutUser())
    }
  }
}

export default connect(mapDispatchToProps)(Logout)