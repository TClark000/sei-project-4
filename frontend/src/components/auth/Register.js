import React from 'react'

import { incidentData } from '../../lib/api'

class Register extends React.Component {

  state = {
    formData: {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  async componentDidMount() {
    const response = await incidentData()
    console.log(response)
  }

  render() {

    return (
      <div>Register</div>
    )
  }
}

export default Register