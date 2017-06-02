import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import Logout from './Logout'
import RegisterForm from './RegisterForm'

class Navbar extends Component {
  render() {
    const { isAuthenticated } = this.props

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <a className="navbar-brand" href="#">Quote App</a>
          <div className='navbar-form'>

            {!isAuthenticated &&
              <LoginForm />
            }

            {isAuthenticated &&
              <Logout />
            }

            <RegisterForm />

          </div>
        </div>
      </nav>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Navbar)