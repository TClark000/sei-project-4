import React from 'react'

import { incidentSubmit } from '../../lib/api'

class IncidentSubmit extends React.Component {

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
      attack_classes: [],
      attack_types: [],
      target_classes: []
    }
  }

  handleChange = event => {
    const formData = {
      ...this.state.formData,
      [event.target.name]: event.target.value
    }
    console.log(formData)
    this.setState({
      formData
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const submitData = {
      records_lost: this.state.formData.recordsLost,
      monetary_cost: this.state.formData.monetaryCost,
      countries: [],
      attack_classes: [],
      attack_types: [],
      target_classes: [],
      ...this.state.formData
    }
    try {
      const response = await incidentSubmit(submitData)
      console.log(response)
      this.props.history.push('/profile')
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    const { date, author, target, description, recordsLost, monetaryCost, link1, link2, tag, vetted } = this.state.formData
    return (
      // <div>Incident submit form</div>
      <section className="section">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
              <div className="field">
                <label className="label">Date</label>
                <div className="control">
                  <input
                    type="Date"
                    className="input"
                    placeholder="25/10/2020"
                    name="date"
                    value={date}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Author of attack</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Author"
                    name="author"
                    value={author}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Target/s</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Target/s"
                    name="target"
                    value={target}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Records lost</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Records lost"
                    name="recordsLost"
                    value={recordsLost}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Monetary Cost</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Monetary Cost"
                    name="monetaryCost"
                    value={monetaryCost}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Link Source - one</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Link Source"
                    name="link1"
                    value={link1}
                    onChange={this.handleChange}
                  />
                </div>
              </div>        <div className="field">
                <label className="label">Link Source - two</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Link Source"
                    name="link2"
                    value={link2}
                    onChange={this.handleChange}
                  />
                </div>
              </div>        <div className="field">
                <label className="label">Tag/s</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Tag/s"
                    name="tag"
                    value={tag}
                    onChange={this.handleChange}
                  />
                </div>
              </div>        <div className="field">
                <label className="label">Vetted</label>
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox"
                      value={vetted}
                      onChange={this.handleChange}
                    />
                  </label>
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

export default IncidentSubmit