import React from 'react'

import { profileUser } from '../../lib/api'

class Profile extends React.Component {

  state = {
    incidents: null,
    comments: null
  }

  async componentDidMount(){
    const response = await profileUser()
    console.log(response.data)
    this.setState({
      incidents: response.data.filed_incident,
      comments: response.data.posted_comments
    })
  }

  render() {

    if (!this.state.incidents || !this.state.comments) return <div>Loading...</div>

    return (
      // <div>Profile</div>
      <section className="section">
        <div className="card container flex-center">
          <div className="card-header">
            <p className="subtitle container has-text-centered"><br></br>Your Profile - details of incidents and comments you have added.
            </p>
            <br></br>
          </div>
          <div className="card-content">
            <div className="field is-horizontal">
              <div className="container">
                { (this.state.incidents.length !== 0) ? <p className="content">Incidents Reported:</p> : <i className="content">No incidents reported by you, submit an incident via the menu link.</i> }
                <div className="content columns is-multiline">
                  {this.state.incidents.map(incident => <div className="column is-full" key={incident.id}>Date: {incident.date} Description: {incident.description}</div>)}
                </div>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="field is-horizontal">
              <div className="container">
                { (this.state.comments.length !== 0) ? <p className="content">Comments posted:</p> : <i className="content">No comments posted.</i>}
                <div className="content columns is-multiline">
                  {this.state.comments.map(comment => <div className="column is-full" key={comment.id}>Date: {comment.updated_at} Text: {comment.text}</div>)}
                </div>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Profile