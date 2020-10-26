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

    if (!this.state.incidents) return <div>Loading...</div>

    return (
      // <div>Profile</div>
      <div className="card">
        <div className="card-header">
          <p className="subtitle"><br></br>Your Profile - a record of incidents and comments added.
          </p>
          <br></br>
        </div>
        <div className="card-content">
          <div className="field is-horizontal">
            <div className="container">
              <p className="content">Incidents Reported:
              </p>
              <div className="content columns is-multiline">
                {this.state.incidents.map(incident => <div className="column is-full" key={incident.id}>Date: {incident.date} Description: {incident.description}</div>)}
              </div>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="field is-horizontal">
            <div className="container">
              <p className="content">Comments posted:
              </p>
              <div className="content columns is-multiline is-vcentered">
                {this.state.comments.map(comment => <div className="column is-full" key={comment.id}>Date: {comment.updated_at} Text: {comment.text}</div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile