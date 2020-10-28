import React, { Component } from 'react'

import IncidentSubmit from './IncidentSubmit'

class IncidentNew extends Component {

  state = {
    formData: {
      date: '',
      author: '',
      target: '',
      description: '',
      recordsLost: 0,
      monetaryCost: 0,
      link1: '',
      link2: '',
      tag: '',
      vetted: false,
      countries: [],
      attackClasses: [],
      attackTypes: [],
      targetClasses: []
    },
    classification: {
      countryIndex: [],
      attackClassIndex: [],
      attackTypeIndex: [],
      targetClassesIndex: []
    },
    profile: {
      isSuperUser: false
    }
  }

  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }
    this.setState({ formData })
    console.log(formData)
  }

  render() {

    return (
      <section className="section">
        <div className="container">
          <IncidentSubmit
            formData={this.state.formData}
            handleChange={this.handleChange}
            // handleSubmit={this.handleSubmit}
          />
        </div>
      </section>
    )
  }
}

export default IncidentNew