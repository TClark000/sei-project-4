import React from 'react'

import '@fortawesome/fontawesome-free/css/all.min.css'
import { popupNotification } from '../../lib/notification'

import { registerUser } from '../../lib/api'

class Register extends React.Component {

  state = {
    formData: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  }

  handleChange = event => {
    // console.log(event.target, event.target.value, event.target.name)
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }
    const errors = {
      ...this.state.errors,
      [event.target.name]: ''
    }
    this.setState({
      formData,
      errors
    })
  }

  handleSubmit = async event => {
    //this line stops refresh of the form
    event.preventDefault()
    const registerData = {
      first_name: this.state.formData.firstName,
      last_name: this.state.formData.lastName,
      password_confirmation: this.state.formData.passwordConfirmation,
      ...this.state.formData
    }
    try {
      const response = await registerUser(registerData)
      console.log(response.data, response.status)
      this.props.history.push('/login')
    } catch (err) {
      // console.log(err.response.data)
      popupNotification('Please enter details for every field. (Do the passwords match?')
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    const { username, email, firstName, lastName, password, passwordConfirmation } = this.state.formData
    return (
      // <div>Register</div>
      <section className="section">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.username ? 'is-danger' : ''}`}
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                </div>
                { this.state.errors.username && <p className="help is-danger">{this.state.errors.username}</p> }
              </div>
              <div className="field">
                <label className="label">Email</label>
                <p className="control has-icons-left has-icons-right">
                  <input
                    className={`input ${this.state.errors.email ? 'is-danger' : ''}`}
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </p>
                { this.state.errors.email && <p className="help is-danger">{this.state.errors.email}</p> }
              </div>
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.firstName ? 'is-danger' : ''}`}
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                  />
                </div>
                { this.state.errors.firstName && <p className="help is-danger">{this.state.errors.firstName}</p> }
              </div>
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.lastName ? 'is-danger' : ''}`}
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleChange}
                  />
                </div>
                { this.state.errors.lastName && <p className="help is-danger">{this.state.errors.lastName}</p> }
              </div>
              <div className="field">
                <label className="label">Password</label>
                <p className="control has-icons-left">
                  <input
                    type="password"
                    className={`input ${this.state.errors.password ? 'is-danger' : ''}`}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left is-primary">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
                { this.state.errors.password && <p className="help is-danger">{this.state.errors.password}</p> }
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <p className="control has-icons-left">
                  <input
                    type="password"
                    className={`input ${this.state.errors.passwordConfirmation ? 'is-danger' : ''}`}
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left is-primary">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
                { this.state.errors.passwordConfirmation  && <p className="help is-danger">{this.state.errors.passwordConfirmation }</p> }
              </div>
              <div className="field">
                <button type="submit" className="button is-fullwidth is-warning">Register</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Register