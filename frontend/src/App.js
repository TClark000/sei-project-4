import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'

import Register from './auth/Register'
import Login from './auth/Login'
import Profile from './auth/Profile'

class App extends React.Component {


  render() {
    return (
      // <div>Hello World</div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
