import React from 'react'
import Select from 'react-select'
import { incidentSubmit, countryIndex, attackClassIndex, attackTypeIndex, targetClassesIndex, profileUser, incidentSingle, incidentUpdate } from '../../lib/api'

import { popupNotification } from '../../lib/notification'
class IncidentSubmit extends React.Component {

  state = {
    formData: {
      owner: 0,
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
    },
    errors: {}
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

      if (this.props.match.params.id){
        const incidentId = this.props.match.params.id
        console.log(incidentId)
        const response = await incidentSingle(incidentId)
        const formData = response.data
        Object.keys(formData).forEach(function(key) {
          if (formData[key] === null) {
            console.log(key)
            switch (true) {
              case 'author' === key || 'target' === key || 'link2' === key || 'tag' === key:
                formData[key] = ''
                break
              case 'records_lost' === key || 'monetary_cost' === key:
                formData[key] = 0
                break
              case 'countries' === key || 'attack_classes' === key || 'attack_types' === key || 'target_classes' === key:
                formData[key] = []
                break
              default:
                formData[key] = ''
            }
          }
        })
        console.log(formData)
        const formDataId = {
          ...formData,
          recordsLost: formData.records_lost,
          monetaryCost: formData.monetary_cost,
          countries: formData.countries.map((item) => ({ 'value': item.id, 'label': item.name })),
          attackClasses: formData.attack_classes.map((item) => ({ 'value': item.id, 'label': item.attack_class })),
          attackTypes: formData.attack_types.map((item) => ({ 'value': item.id, 'label': item.attack_type })),
          targetClasses: formData.target_classes.map((item) => ({ 'value': item.id, 'label': item.target }))
        }
        delete formDataId.records_lost
        delete formDataId.monetary_cost
        delete formDataId.attack_classes
        delete formDataId.attack_types
        delete formDataId.target_classes
        console.log(formDataId)

        this.setState({
          formData: formDataId
        })
      }

      const response = await profileUser()
      const profile = {
        isSuperUser: response.data.is_superuser
      }
      this.setState({
        profile
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
    // console.log(formData)

    const errors = {
      ...this.state.errors,
      [event.target.name]: ''
    }
    this.setState({
      formData,
      errors
    })
  }

  handleMultiSelectChangeCountries = (selected) => {
    const formData = { ...this.state.formData, countries: selected }
    this.setState({ formData })
  }

  handleMultiSelectChangeAttackClasses = (selected) => {
    const formData = { ...this.state.formData, attackClasses: selected }
    this.setState({ formData })
  }

  handleMultiSelectChangeAttackTypes = (selected) => {
    const formData = { ...this.state.formData, attackTypes: selected }
    this.setState({ formData })
  }

  handleMultiSelectChangeTargetClasses = (selected) => {
    const formData = { ...this.state.formData, targetClasses: selected }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const formData = { ...this.state.formData }
    const submitData = {
      ...formData,
      records_lost: Number(formData.recordsLost),
      monetary_cost: Number(formData.monetaryCost),
      owner: formData.owner.id,
      countries: formData.countries.map((item) => (item.value)),
      attack_classes: formData.attackClasses.map((item) => (item.value)),
      attack_types: formData.attackTypes.map((item) => (item.value)),
      target_classes: formData.targetClasses.map((item) => (item.value))
    }
    delete submitData.recordsLost
    delete submitData.monetaryCost
    delete submitData.attackClasses
    delete submitData.attackTypes
    delete submitData.targetClasses
    console.log(submitData)
    try {
      if (this.props.match.params.id){
        const incidentId = this.props.match.params.id
        const response = await incidentUpdate(submitData, incidentId)
        console.log(response)
      } else { 
        const response = await incidentSubmit(submitData)
        console.log(response)
      }
      this.props.history.push('/profile')

    } catch (err) {
      console.log(err.response.data)
      console.log(Object.keys(err.response.data)[0])
      for (var key of Object.keys(err.response.data)) {
        // console.log(key + ' -> ' + err.response.data[key]
        const popComment =  err.response.data[key]
        popupNotification(popComment)
      }
      this.setState({ errors: err.response.data })
    }
  }

  render () {
    if ( !this.state.profile || !this.state.classification ) return <div>Loading...</div>
    const { date, author, target, description, recordsLost, monetaryCost, link1, link2, tag, vetted, countries, attackClasses, attackTypes, targetClasses } = this.state.formData

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
                    className={`input ${this.state.errors.date ? 'is-danger' : ''}`}
                    placeholder="25/10/2020"
                    name="date"
                    value={date}
                    onChange={this.handleChange}
                  />
                </div>
                { this.state.errors.date && <p className="help is-danger">{this.state.errors.date}</p> }
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
                    className={`textarea ${this.state.errors.description ? 'is-danger' : ''}`}
                    // className="textarea"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                  />
                </div>
                { this.state.errors.description && <p className="help is-danger">{this.state.errors.description}</p> }
              </div>
              <div className="field">
                <label className="label">Records lost (1000s)</label>
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
                <label className="label">Monetary Cost (1000US$)</label>
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
                    className={`input ${this.state.errors.link1 ? 'is-danger' : ''}`}
                    placeholder="Link Source"
                    name="link1"
                    value={link1}
                    onChange={this.handleChange}
                  />
                </div>
                { this.state.errors.link1 && <p className="help is-danger">{this.state.errors.link1}</p> }
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
              </div>     
              { this.state.profile.isSuperUser && <div className="field">
                <label className="label">Vetted (by designated users)</label>
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox"
                      value={vetted}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
              </div>}
              <div className="select is-multiple">
                <label className="label">Country</label>
                <div className="control">
                  <Select
                    options={this.state.classification.countryIndex.map((item) => ({ 'value': item.id, 'label': item.name }))}
                    isMulti
                    placeholder="Select one or more"
                    name="countries"
                    value={countries}
                    onChange={this.handleMultiSelectChangeCountries}
                  />
                </div>
              </div>
              <div className="select is-multiple">
                <label className="label">Attack Class</label>
                <div className="control">
                  <Select
                    options={this.state.classification.attackClassIndex.map((item) => ({ 'value': item.id, 'label': item.attack_class }))}
                    isMulti
                    placeholder="Select one or more"
                    name="attackClasses"
                    value={attackClasses}
                    onChange={this.handleMultiSelectChangeAttackClasses}
                  />
                </div>
              </div>             <div className="select is-multiple">
                <label className="label">Attack Types</label>
                <div className="control">
                  <Select
                    options={this.state.classification.attackTypeIndex.map((item) => ({ 'value': item.id, 'label': item.attack_type }))}
                    isMulti
                    placeholder="Select one or more"
                    name="attackTypes"
                    value={attackTypes}
                    onChange={this.handleMultiSelectChangeAttackTypes}
                  />
                </div>
              </div>             <div className="select is-multiple">
                <label className="label">Target Classes</label>
                <div className="control">
                  <Select
                    options={this.state.classification.targetClassesIndex.map((item) => ({ 'value': item.id, 'label': item.target }))}
                    isMulti
                    placeholder="Select one or more"
                    name="targetClasses"
                    value={targetClasses}
                    onChange={this.handleMultiSelectChangeTargetClasses}
                  />
                </div>
              </div>
              <div className="field">
                <button type="submit" className="button is-fullwidth is-warning">Submit Incident</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default IncidentSubmit