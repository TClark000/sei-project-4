import React from 'react'
import { Link } from 'react-router-dom'
import { profileUser, incidentDelete, commentDelete } from '../../lib/api'
import { popupNotification } from '../../lib/notification'
import '@fortawesome/fontawesome-free/css/all.min.css'

class Profile extends React.Component {

  state = {
    incidents: null,
    comments: null,
    delete: false
  }

  async componentDidMount(){
    const response = await profileUser()
    this.setState({
      incidents: response.data.filed_incident,
      comments: response.data.posted_comments
    })
  }

  handleDeleteIncident = async (incidentId) => {
    try {
      await incidentDelete(incidentId)
      const refreshProfile = await profileUser()
      popupNotification('Deleted incident!')
      this.setState({
        incidents: refreshProfile.data.filed_incident
      })
    } catch (err) {
      for (var key of Object.keys(err.response.data)) {
        const popComment =  String(err.response.data[key])
        popupNotification(popComment)
      }
    }
  }

  handleDeleteComment = async (commentId) => {
    try {
      await commentDelete(commentId)
      const refreshProfile = await profileUser()
      popupNotification('Deleted comment!')
      this.setState({
        comments: refreshProfile.data.posted_comments
      })
    } catch (err) {
      for (var key of Object.keys(err.response.data)) {
        const popComment =  String(err.response.data[key])
        popupNotification(popComment)
      }
    }
  }

  render() {

    if (!this.state.incidents || !this.state.comments) return <div><span className="icon has-text-info"><span className="fa-stack"><i className ="fas fa-spinner fa-pulse is-centered"> </i></span></span></div>

    return (
      <section className="section">
        <div className="card container flex-center">
          <div className="card-header">
            <p className="subtitle container has-text-centered label"><br></br>Your Profile - details of incidents and comments you have added.
            </p>
            <br></br>
          </div>
          <div className="card-content">
            <div className="field is-horizontal">
              <div className="container">
                { (this.state.incidents.length !== 0) ? <p className="content is-warning is-bold">Incidents Reported:</p> : <i className="content is-warning is-bold">No incidents reported by you, submit an incident via the menu link.</i> }
                <div className="content columns is-multiline">
                  {this.state.incidents.map(incident => <div className="column is-full" key={incident.id}>Date: {String(incident.date).substr(0,10)} Description: {incident.description}
                    <div className="tags">
                      <Link to={`/submit/${incident.id}`}><span className="tag">edit</span></Link>
                      <div><a href='#'><span onClick={() => this.handleDeleteIncident(incident.id)} className="tag">delete x</span></a></div>
                    </div>
                  </div>)}
                </div>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="field is-horizontal">
              <div className="container">
                { (this.state.comments.length !== 0) ? <p className="content is-warning is-bold">Comments posted:</p> : <i className="content is-warning is-bold">No comments posted.</i>}
                <div className="content columns is-multiline">
                  {this.state.comments.map(comment => <div className="column is-full" key={comment.id}>Date: {String(comment.created_at).substr(0,10)}  Text: {comment.text}
                    <div className="tags">
                      <div><a href='#'><span onClick={() => this.handleDeleteComment(comment.id)} className="tag">delete x</span></a></div>
                    </div>
                  </div>)}
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