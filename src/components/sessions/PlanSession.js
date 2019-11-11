/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import SlicesList from "./SlicesList";
import { Switch } from "react-materialize";
import Dropdown from "muicss/lib/react/dropdown";
import DropdownItem from "muicss/lib/react/dropdown-item";
import { addSliceToSession, removeSliceFromSession } from "../../store/actions/sessionActions";

class PlanSession extends Component {
	state = {
		sliceId: "",
		ImageFilter: false,
		TopicFilter: "",
		DifficultyFilter: ""
	};

	handleChange = (e) => {
		const { target } = e;

		this.setState((state) => ({
			...state,
			[target.id]: target.value
		}));
	};

	handleImage = () => {
		this.setState((state) => ({
			...state,
			ImageFilter: !this.state.ImageFilter
		}));
	};
	handleDifficulty = (e, data) => {
		console.log(e);
		this.setState((state) => ({
			...state,
			DifficultyFilter: e
		}));
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { props, state } = this;

		const sliceId = state.sliceId;

		const sessionplanid = props.sessionplansid;

		const composite = { sessionplanid, sliceId };

		document.getElementById("sliceId").value = "";

		props.addSliceToSession(composite);
	};

	handleDelete = (e) => {
		e.preventDefault();
		const { props } = this;
		const { target } = e;
		const value = target.innerHTML;

		const sessionplanid = props.sessionplansid;

		const composite = { sessionplanid, value };

		props.removeSliceFromSession(composite);
	};

	render() {
		//just check if the user is authenticated
		const { props } = this;
		const { auth, user, sessionplansid, sessionplans, sliceError, slices } = props;

		if (!auth.uid) {
			return <Redirect to="/signin" />;
		}

		if (user && user.userRole === "student") {
			return <Redirect to="/" />;
		}

		return (
			<div className="dashboard">
				<div id="plan-session-row" className="row">
					<div id="session-style" className="col s12 m5 offset-m1 ease-in-anim">
						<form id="session-form" onSubmit={this.handleSubmit} className="white">
							<h4 className="grey-text text-darken-3">Session Planner</h4>
							<h2 className="grey-text text-darken-3">{sessionplans.sessionPlanSummary}</h2>
							<h5 className="grey-text text-darken-3">
								<b>Planner ID:</b> {sessionplansid}
							</h5>
							{sessionplans &&
								sessionplans.sliceIds &&
								sessionplans.sliceIds.map((slices) => {
									return (
										<h5 className="slice-list" onClick={this.handleDelete} key={slices}>
											{slices}
										</h5>
									);
								})}

							<div className="input-field">
								<label htmlFor="sliceId">Input Slice Id to Add</label>
								<input type="text" name="sliceId" id="sliceId" onChange={this.handleChange} />
							</div>
							<div className="input-field">
								<button type="submit" className="btn purple-bg purple darken-3 z-depth-1">
									Add
								</button>
							</div>
							{sliceError ? (
								<div className="red-text center text-darken-1">
									<p>{sliceError}</p>
								</div>
							) : null}
						</form>

						<div className="white" style={{ marginTop: "3em !important", margin: "10px" }}>
							<div style={{ paddingTop: "10px" }}>
								<div className="input-field" style={{ margin: "10px" }}>
									<label htmlFor="TopicFilter">Input Topic Filter</label>
									<input type="text" name="TopicFilter" id="TopicFilter" onChange={this.handleChange} />
								</div>
							</div>
							<div style={{ display: "ruby", margin: "10px" }}>
								<Switch offLabel="Filter for Images" onChange={this.handleImage} id="ImageFilter" />
								<div className="input-field" style={{ marginLeft: "2em" }}>
									<label style={{ marginRight: "2em", margin: "10px" }}> Filter Difficulty</label>
									<Dropdown
										color="grey"
										label={this.state.DifficultyFilter}
										id="DifficultyFilter"
										onSelect={this.handleDifficulty}
										style={{ margin: "10px", marginLeft: "9em" }}
									>
										<DropdownItem value="">None</DropdownItem>
										<DropdownItem value="easy">Easy</DropdownItem>
										<DropdownItem value="medium">Medium</DropdownItem>
										<DropdownItem value="hard">Hard</DropdownItem>
									</Dropdown>
								</div>
							</div>
						</div>
					</div>
					<div id="slice-list" className="col s12 m4 offset-m1">
						<SlicesList
							slices={slices}
							profile={auth}
							imageFilter={this.state.ImageFilter}
							topicFilter={this.state.TopicFilter}
							difficultyFilter={this.state.DifficultyFilter}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { id } = ownProps.match.params;
	const { sessionplans } = state.firestore.data;
	const { users } = state.firestore.data;
	const sessionplan = sessionplans ? sessionplans[id] : null;
	const user = users ? users[state.firebase.auth.uid] : null;
	return {
		sessionplans: sessionplan,
		auth: state.firebase.auth,
		user: user,
		sessionplansid: id,
		slices: state.firestore.ordered.slices,
		sliceError: state.session.sliceError
	};
};
const mapDispatchToProps = (dispatch) => ({
	addSliceToSession: (session) => dispatch(addSliceToSession(session)),
	removeSliceFromSession: (session) => dispatch(removeSliceFromSession(session))
});

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect(["users", "sessionplans", "slices"])
)(PlanSession);
