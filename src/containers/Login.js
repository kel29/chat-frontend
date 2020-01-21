import React, { PureComponent } from 'react'
import LoginAlert from '../components/LoginAlert'
import LoggedInHOC from '../HOC/LoggedInHOC'
import { API_ROOT, HEADERS } from '../services/constants'

class Login extends PureComponent {
  state = {
    username: '',
    email: '',
    loginError: false
  }

  handleTyping = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }


  userLogin = (e) => {
    e.preventDefault()
    let currentUser = this.props.users.find(user => user.email === this.state.email.toLowerCase() && user.name === this.state.username.toLowerCase())
    if (!currentUser) {
      this.createUser().then(newUser => {
        if (newUser.id) {
          this.props.addNewUser(newUser)
          this.props.handleLogin(newUser)
        } else {
          this.errorLoggingIn()
        }
      })
    } else {
      this.props.handleLogin(currentUser)
    }
  }

  createUser = () => {
    return fetch(`${API_ROOT}users`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        name: this.state.username.toLowerCase(),
        email: this.state.email.toLowerCase()
      })
    }).then(res => res.json())
  }

  errorLoggingIn = () => {
    this.setState({
      loginError: true
    })
  }

  render () {
    return (
      <>
        {this.state.loginError ? <LoginAlert /> : null}
        <div className='card bg-light mt-3 mb-3 shadow'>
          <div className='card-header'>
            <h3>Welcome to Chat!</h3> 
            <h6>Please login or sign up</h6>
          </div>
          <div className='card-body'>
            <form onSubmit={this.userLogin}>
              <div className='form-group form-row'>
                <label htmlFor='username' className='col-sm-3 col-form-label-sm far fa-user'>  Username</label>
                <div className='col'>
                  <input 
                    type='text' 
                    placeholder='enter your username' 
                    id='username' 
                    value={this.state.username}
                    className='form-control shadow-sm' 
                    required 
                    onChange={this.handleTyping}/>
                </div>
              </div>
              <div className='form-group form-row'>
                <label htmlFor='email' className='col-sm-3 col-form-label-sm far fa-envelope'> Email</label>
                <div className='col'>
                  <input 
                    type='text' 
                    placeholder='enter your email' 
                    id='email' 
                    value={this.state.email}
                    className='form-control mb-3 shadow-sm' 
                    required 
                    onChange={this.handleTyping}/>
                </div>
              </div>
              <button className='btn btn-outline-primary btn-block shadow-sm' type='submit'>Login</button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default LoggedInHOC(Login)
