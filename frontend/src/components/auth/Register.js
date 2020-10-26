import React from 'react'

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
    }
  }

  async componentDidMount() {
    // const response = await incidentData()
    // console.log(response)
  }

  handleChange = event => {
    // console.log(event.target, event.target.value, event.target.name)
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }
    // console.log(formData)
    this.setState({
      formData
    })
  }

  handleSubmit = async event => {
    //this line stops refresh of the form
    event.preventDefault()
    const registerData = {
      username: this.state.formData.username,
      email: this.state.formData.email,
      first_name: this.state.formData.firstName,
      last_name: this.state.formData.lastName,
      password: this.state.formData.password,
      password_confirmation: this.state.formData.passwordConfirmation
    }
    console.log(registerData)
    const response = await registerUser(registerData)
    console.log(response)
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
                    className="input"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={this.handleChange}
                  />
                </div>
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