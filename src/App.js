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
import ClassSession from './components/classes/ClassSession'


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
            <Route path="/:any" component={Dashboard} />
            <Route path="/sessions/:id" componen={ClassSession}></Route>
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
