import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { registerUser, registerError } from '../actions'

import ErrorMessage from './ErrorMessage'

class RegisterForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      fields: {
        username: '',
        password: '',
        confirm: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.resetFields = this.resetFields.bind(this)
  }

  handleChange (e) {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    })
  }

  handleClick (event) {
    const { username, password, confirm } = this.state.fields
    if (password !== confirm) {
      this.props.registerError('Passwords do not match!')
      return
    }
    const creds = { username: username.trim(), password: password.trim() }
    this.props.registerUser(creds)
      .then(this.resetFields)
  }

  resetFields () {
    this.setState({
      fields: {
        username: '',
        password: '',
        confirm: ''
      }
    })
  }

  render() {
    const { username, password, confirm } = this.state.fields
    return (
      <div>
        <input type='text' className='form-control' name='username' placeholder='Username' onChange={this.handleChange} value={username} />
        <input type='password' className='form-control' name='password' placeholder='Password' onChange={this.handleChange} value={password} />
        <input type='password' className='form-control' name='confirm' placeholder='Confirm' onChange={this.handleChange} value={confirm} />
        <button onClick={(event) => this.handleClick(event)} className='btn btn-primary' >
          Register
        </button>

        <ErrorMessage reducer='auth' />

      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (creds) => {
      return dispatch(registerUser(creds))
    },
    registerError: (message) => {
      dispatch(registerError(message))
    }
  }
}

export default connect(null, mapDispatchToProps)(RegisterForm)