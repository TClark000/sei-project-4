import React from 'react'

import '@fortawesome/fontawesome-free/css/all.min.css'
import { popupNotification } from '../../lib/notification'

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
    try {
      const response = await loginUser(this.state.formData)
      console.log(response.data, response.status)
      setToken(response.data.token)
      this.props.history.push('/profile')
    } catch (err) {
      console.log(Object.keys(err.response.data)[0])
      for (var key of Object.keys(err.response.data)) {
        // console.log(key + ' -> ' + err.response.data[key]
        const popComment =  err.response.data[key]
        popupNotification(popComment)
      }
    }
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
                <p className="control has-icons-left has-icons-right">
                  <input
                    type="email"
                    className="input"
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
              </div>
              <div className="field">
                <label className="label">Password</label>
                <p className="control has-icons-left">
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left is-primary">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
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