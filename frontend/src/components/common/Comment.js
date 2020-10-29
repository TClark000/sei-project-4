import React from 'react'

import { commentCreate } from '../../lib/api'

import '@fortawesome/fontawesome-free/css/all.min.css'

class Comment extends React.Component {

  state = { formData: { text: '' } }

  handleChange = event => {
    const formData = {
      text: event.target.value
    }
    this.setState({ formData })
    console.log(formData)
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const submitData = this.state.formData
      console.log(submitData)
      const response = await commentCreate(submitData)
      console.log(response.data, response.status)
      this.props.history.push('/profile')
    } catch (err) {
      console.log(err)
    }   
  }

  render() {
    if ( !this.state.formData ) return <div>Loading...</div>
    const { comment } = this.state.formData
    return (
      // <div>Comment</div>
      <section className="section">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
              <div className="field">
                <label className="label">Comment</label>
                <p className="control">
                  <textarea 
                    className="textarea" 
                    type="Textarea"
                    placeholder="Please leave a comment .."
                    name="comment"
                    value={comment}
                    onChange={this.handleChange}>
                  </textarea>
                </p>
              </div>
              <div className="field">
                <button type="submit" className="button is-fullwidth is-warning">Post your Comment</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}
export default Comment