import React from 'react'
import { connect } from 'react-redux'

const ErrorMessage = (props) => (
    <div>
       <p>{props.message}</p> 
    </div>
)

const mapStateToProps = (state, ownProps) => {
    return {
        message: state[ownProps.reducer].errorMessage
    }
}

export default connect(mapStateToProps)(ErrorMessage)