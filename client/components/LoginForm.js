import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions'

import ErrorMessage from './ErrorMessage'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fields: {
        username: '',
        password: ''
      }
    }
  }

  handleChange (e) {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    return (
      <div>
        <input type='text' name='username' onChange={this.handleChange} className='form-control' placeholder='Username'/>
        <input type='password' name='password' onChange={this.handleChange} className='form-control' placeholder='Password'/>
        <button onClick={(event) => this.handleClick(event)} className='btn btn-primary'>
          Login
        </button>
        <ErrorMessage reducer='auth' />
      </div>
    )
  }

  handleClick(event) {
    const { username, password } = this.state.fields
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.loginUser(creds)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (creds) => {
      dispatch(loginUser(creds))
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)