/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Container from "muicss/lib/react/container";
import Row from "muicss/lib/react/row";
import Col from "muicss/lib/react/col";
import { Button, Icon } from "react-materialize";
import {
	nextSlice,
	prevSlice,
	rePoll,
	setPolling,
	revealAnswer,
	updateSession,
	getNextSlice,
	displayGraph
} from "../../store/actions/dashboardActions";

class Clicker extends Component {
	state = {};

	handlePolling = () => {
		const { props } = this;
		const { session, sessionId } = props;
		let status = session.polling;

		let composite = { status, sessionId };

		props.setPolling(composite);
	};

	revealAnswer = () => {
		const { props } = this;
		const { session, sessionId } = props;
		let status = session.revealAnswer;

		let composite = { status, sessionId };

		props.revealAnswer(composite);
	};

	handleRepoll = () => {
		const { props } = this;
		const { sessionId } = props;

		props.rePoll(sessionId);
	};

	handlePrevious = () => {
		const { props } = this;
		const { sessionId } = props;
		const { session } = props;

		let id = session.sessionPlan[session.sliceNumber - 1];

		if (session.sliceNumber > 1) {
			props.prevSlice(sessionId);
			props.updateSession(sessionId);
			props.getNextSlice(id);
		}
	};

	handleNext = (e) => {
		const { props } = this;
		const { sessionId } = props;
		const { session } = props;

		let id = session.sessionPlan[session.sliceNumber + 1];

		if (session.sliceNumber < session.sessionPlan.length) {
			props.nextSlice(sessionId);
			props.updateSession(sessionId);
		}
		props.getNextSlice(id);
	};

	handleHistogram = () => {
		const { props } = this;
		const { session, sessionId } = props;
		let status = session.displayGraph;

		let composite = { status, sessionId };

		props.displayGraph(composite);
	};

	render() {
		const { session, auth, authError, profile } = this.props;

		if (authError) {
			console.log(authError);
		}

		if (!auth.uid) {
			return <Redirect to="/signin" />;
		}

		if (profile.userRole !== "admin" && profile.userRole !== "instructor") {
			return <Redirect to="/"></Redirect>;
		}

		const StyleOpen = {
			height: "100%",
			width: "100%",
			alignItems: "center",
			justifyContent: "center",
			color: "black",
			background: "rgb(102, 255, 97)"
		};
		const StyleClosed = {
			height: "100%",
			width: "100%",
			alignItems: "center",
			justifyContent: "center",
			color: "white",
			background: "#ff6161"
		};

		return (
			<Container
				fluid
				style={{
					width: "95vw",
					height: "85vh",
					background: "#4911623d none repeat scroll 0% 0%",
					marginTop: "1em"
				}}
			>
				<Row style={{ height: "31%" }}>
					<Col md="6" xs="6" style={{ height: "90%", marginTop: "2em" }}>
						{session.displayGraph ? (
							<Button
								waves="dark"
								style={{
									width: "100%",
									height: "100%",
									color: "black"
								}}
								className="btn white-bg white darken-3 z-depth-1 waves-effect waves-light"
								onClick={this.handleHistogram}
							>
								Hide Graph
							</Button>
						) : (
							<Button
								waves="dark"
								style={{
									width: "100%",
									height: "100%",
									color: "black"
								}}
								className="btn white-bg white darken-3 z-depth-1 waves-effect waves-light"
								onClick={this.handleHistogram}
							>
								Show Graph
							</Button>
						)}
					</Col>
					<Col md="6" xs="6" style={{ height: "90%", marginTop: "2em" }}>
						{session.revealAnswer ? (
							<Button
								style={{
									width: "100%",
									height: "100%",
									background: "grey"
								}}
								waves="light"
								onClick={this.revealAnswer}
							>
								Hide Correct Answer
							</Button>
						) : (
							<Button
								style={{
									width: "100%",
									height: "100%",
									background: "white",
									color: "black"
								}}
								waves="dark"
								onClick={this.revealAnswer}
							>
								Show Correct Answer
							</Button>
						)}
					</Col>
				</Row>
				<Row style={{ height: "31%" }}>
					<Col md="6" xs="6" style={{ height: "90%", marginTop: "2em" }}>
						<Button
							waves="light"
							style={{
								width: "100%",
								height: "100%",
								fontSize: "large"
							}}
							className="purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
							onClick={this.handlePrevious}
						>
							<Icon className="bigButt">skip_previous</Icon>
						</Button>
					</Col>
					<Col md="6" xs="6" style={{ height: "90%", marginTop: "2em" }}>
						<Button
							waves="light"
							style={{
								width: "100%",
								height: "100%"
							}}
							className="purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
							onClick={this.handleNext}
						>
							<Icon className="bigButt">skip_next</Icon>
						</Button>
					</Col>
				</Row>
				<Row style={{ height: "31%" }}>
					<Col md="6" xs="6" style={{ height: "90%", marginTop: "2em" }}>
						<Button
							waves="light "
							style={{
								background: "grey",
								width: "100%",
								height: "100%"
							}}
							onClick={this.handleRepoll}
						>
							Repoll Question
						</Button>
					</Col>
					<Col md="6" xs="6" style={{ height: "90%", marginTop: "2em" }}>
						{session && session.polling ? (
							<Button waves="light" style={StyleOpen} onClick={this.handlePolling} id="PollingStatus">
								Polling Status : OPEN
							</Button>
						) : (
							<Button waves="dark" style={StyleClosed} onClick={this.handlePolling} id="PollingStatus">
								Polling Status : CLOSED
							</Button>
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { id, cid } = ownProps.match.params;
	const { classes } = state.firestore.data;
	const { sessions, slices } = state.firestore.data;
	const pie = classes ? classes[id] : null;
	const session = sessions ? sessions[id] : null;
	return {
		pie: pie,
		classId: cid,
		sessionId: id,
		session: session,
		slices: slices,
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

const mapDispatchToProps = (dispatch) => ({
	nextSlice: (pie) => dispatch(nextSlice(pie)),
	prevSlice: (pie) => dispatch(prevSlice(pie)),
	setPolling: (pie) => dispatch(setPolling(pie)),
	revealAnswer: (pie) => dispatch(revealAnswer(pie)),
	rePoll: (pie) => dispatch(rePoll(pie)),
	updateSession: (pie) => dispatch(updateSession(pie)),
	displayGraph: (pie) => dispatch(displayGraph(pie)),
	getNextSlice: (pie) => dispatch(getNextSlice(pie))
});

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect(["sessions", "slices"])
)(Clicker);
