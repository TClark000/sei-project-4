import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Notifications from 'react-notify-toast'

import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import Comment from './components/common/Comment'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Profile from './components/auth/Profile'
import IncidentSubmit from './components/incidents/IncidentSubmit'

class App extends React.Component {


  render() {
    return (
      <BrowserRouter>
        <Notifications/>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/submit/:id" component={IncidentSubmit} />
          <Route path="/submit" component={IncidentSubmit} />
          <Route path="/comment" component={Comment} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
