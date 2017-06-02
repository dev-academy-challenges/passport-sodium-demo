import React from 'react'
import { connect } from 'react-redux'

class Loading extends React.Component {
  render () {
    return  (
      <div>
        {this.props.isFetching &&
          <h1>Loading....</h1>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state[ownProps.reducer].isFetching
  }
}

export default connect(mapStateToProps)(Loading)