import React from 'react'

import { loginUser } from '../../lib/api'
import { setToken } from '../auth/auth'

class Login extends React.Component {
  state = {
    formData: {
      email: '',
      password: ''
    }
  }

  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }
    this.setState({ formData })
    // console.log(formData)
  }

  handleSubmit = async event => {
    event.preventDefault()
    console.log(this.state.formData)
    const response = await loginUser(this.state.formData)
    console.log(response)

    setToken(response.data.token)

    this.props.history.push('/profile')
  }


  render() {
    const { email, password } = this.state.formData
    return (
    // <div>Login</div>
      <section className="section">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
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
                <button type="submit" className="button is-fullwidth is-warning">Login</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}
export default Login