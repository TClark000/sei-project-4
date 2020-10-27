import React from 'react'
import Select from 'react-select'
import { incidentSubmit, countryIndex, attackClassIndex, attackTypeIndex, targetClassesIndex } from '../../lib/api'

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
      attackClasses: [],
      attackTypes: [],
      targetClasses: []
    },
    classification: {
      countryIndex: [],
      attackClassIndex: [],
      attackTypeIndex: [],
      targetClassesIndex: []
    }
  }

  async componentDidMount() {
    try {
      const respCountryIndex = await countryIndex()
      console.log(respCountryIndex.data)
      const respAttackClassIndex = await attackClassIndex()
      console.log(respAttackClassIndex.data)
      const respAttackTypeIndex = await attackTypeIndex()
      console.log(respAttackTypeIndex.data)
      const respTargetClassesIndex = await targetClassesIndex()
      console.log(respTargetClassesIndex.data)

      const classification = {
        ...this.state.classification, 
        countryIndex: respCountryIndex.data,
        attackClassIndex: respAttackClassIndex.data,
        attackTypeIndex: respAttackTypeIndex.data,
        targetClassesIndex: respTargetClassesIndex.data
      }

      this.setState({
        classification
      })

    } catch (err) {
      console.log(err)
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

  handleMultiSelectChangeCountries = (selected) => {
    const selectedItems = selected ? selected.map(item=> item.value) : []
    const formData = { ...this.state.formData, countries: selectedItems }
    this.setState({ formData })
  }

  handleMultiSelectChangeAttackClasses = (selected) => {
    const selectedItems = selected ? selected.map(item=> item.value) : []
    const formData = { ...this.state.formData, attackClasses: selectedItems }
    this.setState({ formData })
  }

  handleMultiSelectChangeAttackTypes = (selected) => {
    const selectedItems = selected ? selected.map(item=> item.value) : []
    const formData = { ...this.state.formData, attackTypes: selectedItems }
    this.setState({ formData })
  }

  handleMultiSelectChangeTargetClasses = (selected) => {
    const selectedItems = selected ? selected.map(item=> item.value) : []
    const formData = { ...this.state.formData, targetClasses: selectedItems }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const submitData = {
      records_lost: this.state.formData.recordsLost,
      monetary_cost: this.state.formData.monetaryCost,
      attack_classes: this.state.formData.attackClasses,
      attack_types: this.state.formData.attackTypes,
      target_classes: this.state.formData.targetClasses,
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
    if (!this.state.classification) return <div>Loading...</div>
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
                    placeholder="0"
                    name="recordsLost"
                    type="number"
                    value={recordsLost}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Monetary Cost (US$)</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="0"
                    name="monetaryCost"
                    type="number"
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
              <div className="select is-multiple">
                <label className="label">Country</label>
                <div className="control">
                  <Select
                    options={this.state.classification.countryIndex.map((item) => ({ value: item.id, label: item.name }))}
                    isMulti
                    placeholder="Select one or more"
                    name="countries"
                    value= {this.options}
                    onChange={this.handleMultiSelectChangeCountries}
                  />
                </div>
              </div>
              <div className="select is-multiple">
                <label className="label">Attack Class</label>
                <div className="control">
                  <Select
                    options={this.state.classification.attackClassIndex.map((item) => ({ value: item.id, label: item.attack_class }))}
                    isMulti
                    placeholder="Select one or more"
                    name="attackClass"
                    value={this.options}
                    onChange={this.handleMultiSelectChangeAttackClasses}
                  />
                </div>
              </div>             <div className="select is-multiple">
                <label className="label">Attack Types</label>
                <div className="control">
                  <Select
                    options={this.state.classification.attackTypeIndex.map((item) => ({ value: item.id, label: item.attack_type }))}
                    isMulti
                    placeholder="Select one or more"
                    name="attackType"
                    value={this.options}
                    onChange={this.handleMultiSelectChangeAttackTypes}
                  />
                </div>
              </div>             <div className="select is-multiple">
                <label className="label">Target Classes</label>
                <div className="control">
                  <Select
                    options={this.state.classification.targetClassesIndex.map((item) => ({ value: item.id, label: item.target }))}
                    isMulti
                    placeholder="Select one or more"
                    name="targetClass"
                    value={this.options}
                    onChange={this.handleMultiSelectChangeTargetClasses}
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

export default IncidentSubmit