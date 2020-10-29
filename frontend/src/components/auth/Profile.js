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
    // console.log(response.data)
    this.setState({
      incidents: response.data.filed_incident,
      comments: response.data.posted_comments
    })
  }

  handleDeleteIncident = async (incidentId) => {
    try {
      const response = await incidentDelete(incidentId)
      console.log(response) 
      const refreshProfile = await profileUser()
      popupNotification('Deleted incident!')
      this.setState({
        incidents: refreshProfile.data.filed_incident
      })
    } catch (err) {
      popupNotification(err)
    }
  }

  handleDeleteComment = async (commentId) => {
    try {
      const response = await commentDelete(commentId)
      console.log(response) 
      const refreshProfile = await profileUser()
      popupNotification('Deleted comment!')
      this.setState({
        comments: refreshProfile.data.posted_comments
      })
    } catch (err) {
      popupNotification(err)
    }
  }

  render() {

    if (!this.state.incidents || !this.state.comments) return <div><span className="icon has-text-info"><span className="fa-stack"><i className ="fas fa-spinner fa-pulse is-centered"> </i></span></span></div>

    return (
      // <div>Profile</div>
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
                      <div><a href='#'><span onClick={this.handleDeleteIncident.bind(this,incident.id)} className="tag">delete x</span></a></div>
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
                      {/* <Link to={`/comment/${comment.id}`}><span className="tag">edit</span></Link> */}
                      <div><a href='#'><span onClick={this.handleDeleteComment.bind(this,comment.id)} className="tag">delete x</span></a></div>
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