import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ClassDetails from "./components/classes/ClassDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AddClass from "./components/classes/AddClass";
import CreateClass from "./components/classes/CreateClass";
import Session from "./components/classes/ClassSession";
import CreateSlice from "./components/classes/CreateSlice";
import Presentation from "./components/classes/Presentation";
import Projection from "./components/util/frickenlazorbeams";
import SessionPlans from "./components/sessions/SessionPlans";
import PlanSession from "./components/sessions/PlanSession";
import ProfilePage from "./components/profile/ProfilePage";
import ProfileSettings from "./components/profile/ProfileSettings";
import SliceDetails from "./components/sessions/SliceDetails";
import Clicker from "./components/classes/Clicker";
import LandingPage from "./components/dashboard/LandingPage";
import ChangeRoles from "./components/profile/ChangeRoles";

//this is where all of the links to all of th components are located. Make sure to import the components with the link route
class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/changeRole" component={ChangeRoles} />
						<Route exact path="/landing" component={LandingPage} />
						<Route path="/classes/:id" component={ClassDetails} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
						<Route path="/addClass" component={AddClass} />
						<Route path="/createSlice" component={CreateSlice} />
						<Route path="/createClass" component={CreateClass} />
						<Route push exact path="/sessionplans" component={SessionPlans} />
						<Route push path="/sessionplans/:id" component={PlanSession} />
						<Route exact path="/session/:id" component={Session} />
						<Route exact path="/session/:id/projection" component={Projection} />
						<Route exact path="/session/:id/dashboard" component={Presentation} />
						<Route exact path="/session/:id/clicker" component={Clicker} />
						<Route exact path="/slices/:id" component={SliceDetails} />
						<Route path="/users/:id" component={ProfilePage} />
						<Route exact path="/settings" component={ProfileSettings} />
						<Route path="/:any" component={Dashboard} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.firebase.auth
});

export default compose(
	firebaseConnect(),
	connect(mapStateToProps)
)(App);
