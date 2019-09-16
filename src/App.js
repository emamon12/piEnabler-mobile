import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ClassDetails from './components/classes/ClassDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import AddClass from './components/classes/AddClass'
import CreateClass from './components/classes/CreateClass'
import Session from './components/classes/ClassSession'

//this is where all of the links to all of th components are located. Make sure to import the components with the link route
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard}></Route>
            <Route path='/classes/:id' component={ClassDetails}></Route>
            <Route path='/signin' component={SignIn}></Route>
            <Route path='/signup' component={SignUp}></Route>
            <Route path='/addClass' component={AddClass}></Route>
            <Route path='/createClass' component={CreateClass}></Route>
            <Route path='/session/:id' component={Session}></Route>
            <Route path="/:any" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);