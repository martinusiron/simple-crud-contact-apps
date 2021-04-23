import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"

import AddContact from './components/addContact'
import Contact from './components/detailContact'
import ListContact from './components/listContacts'

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/contact" className="navbar-brand">
            Simple CRUD Contacts App
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/contact"} className="nav-link">Contacts</Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/contact"]} component={ListContact} />
            <Route exact path="/add" component={AddContact} />
            <Route exact path="/contact/:id" component={Contact} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
