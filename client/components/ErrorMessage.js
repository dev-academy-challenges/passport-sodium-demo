import React from 'react'
import { connect } from 'react-redux'

class ErrorMessage extends React.Component {
  render () {
    return (
      <div>
        <p>{this.props.message}</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: state[ownProps.reducer].errorMessage
  }
}

export default connect(mapStateToProps)(ErrorMessage)