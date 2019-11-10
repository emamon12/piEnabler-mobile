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
import { Card, Button, Icon } from "react-materialize";
import Clock from "react-live-clock";
import ProjectionTemplate from "../util/ProjectionTemplate";
import Histogram from "../util/histogram";
import { nextSlice, prevSlice, rePoll, setPolling, revealAnswer, changeDifficulty, updateSession } from "../../store/actions/sessionActions";

class Presentation extends Component {
	state = {
		view: null,
		Voted: 83,
		Here: 150
	};

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

		if (session.sliceNumber > 1) {
			props.prevSlice(sessionId);
			props.updateSession(sessionId);
		}
	};

	handleNext = (e) => {
		const { props } = this;
		const { sessionId } = props;
		const { session } = props;

		if (session.sliceNumber < session.sessionPlan.length) {
			props.nextSlice(sessionId);
			props.updateSession(sessionId);
		}
	};

	handleDifficulty = () => {
		const { props } = this;
		const { sessionId } = props;
		const { session } = props;

		let difficulty = session.difficulty;

		let composite = { difficulty, sessionId };

		props.changeDifficulty(composite);
	};

	handleTopic = () => {
		console.log("Topic Clicked");
	};

	handleHistogram = () => {
		console.log("Histogram Clicked");
	};

	render() {
		const { session, auth, authError } = this.props;
		let state = this.state;

		if (authError) {
			console.log(authError);
		}

		if (!auth.uid) {
			return <Redirect to="/signin" />;
		}

		var votePercent = (state.Voted / state.Here) * 100;

		const StyleOpen = {
			fontSize: "1vw",
			height: "100%",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: "black",
			background: "rgb(102, 255, 97)"
		};
		const StyleClosed = {
			fontSize: "1vw",
			height: "100%",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: "white",
			background: "#ff6161"
		};

		const correctClass = "collection-item black-text CorrectAnswer";
		const regClass = "collection-item black-text";

		return (
			<Container
				fluid
				style={{
					width: "95vw",
					height: "90vh",
					background: "#4911623d none repeat scroll 0% 0%",
					marginTop: "1em"
				}}
			>
				<Row style={{ height: "85%" }}>
					<Col
						md="4"
						style={{
							paddingRight: "4%",
							paddingLeft: "3%",
							paddingTop: "2%",
							height: "95%"
						}}
					>
						<Card
							className="white darken-3"
							textClassName="black-text"
							title="Student View"
							style={{ height: "100%", position: "relative", textAlign: "center" }}
						>
							<div
								className="collection card-content"
								onClick={this.handleListClick}
								style={{ height: "100%", textAlign: "left", marginBottom: "7%" }}
							>
								<a
									id="answer1"
									name="answer1"
									href="#!"
									className={session.answer1 === session.trueAnswer && session.revealAnswer ? correctClass : regClass}
								>
									{session ? "A: " + session.answer1 : "A:"}
								</a>
								<a
									id="answer2"
									name="answer2"
									href="#!"
									className={session.answer2 === session.trueAnswer && session.revealAnswer ? correctClass : regClass}
								>
									{session ? "B: " + session.answer2 : "B:"}
								</a>
								<a
									id="answer3"
									name="answer3"
									href="#!"
									className={session.answer3 === session.trueAnswer && session.revealAnswer ? correctClass : regClass}
								>
									{session ? "C: " + session.answer3 : "C:"}
								</a>
								<a
									id="answer4"
									name="answer4"
									href="#!"
									className={session.answer4 === session.trueAnswer && session.revealAnswer ? correctClass : regClass}
								>
									{session ? "D: " + session.answer4 : "D:"}
								</a>
							</div>
							{session.revealAnswer ? (
								<Button
									style={{
										bottom: "2px",
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
										bottom: "2px",
										background: "white",
										color: "black"
									}}
									waves="dark"
									onClick={this.revealAnswer}
								>
									Show Correct Answer
								</Button>
							)}
						</Card>
					</Col>
					<Col md="4" style={{ paddingRight: "3em", height: "90%", marginTop: "2%" }}>
						<Row style={{ height: "50%", marginBottom: "1em" }}>
							<ProjectionTemplate
								slide="Current Slice"
								url={session && session.url}
								question={session && session.question}
								title={session ? session.title : ""}
							/>
						</Row>
						<Row style={{ height: "50%", marginBottom: "-1em" }}>
							<ProjectionTemplate slide="Next Slice" url={""} question={""} title={""} />
						</Row>
					</Col>
					<Col md="4" style={{ paddingRight: "3em", height: "95%", marginTop: "2%" }}>
						<Row style={{ height: "50%" }}>
							<Histogram sid={this.props.sessionId} />
						</Row>
						<Row style={{ height: "50%", marginTop: "3em" }}>
							<Container style={{ height: "100%" }}>
								<Row style={{ height: "35%" }}>
									<Col
										style={{
											width: "50%",
											height: "100%",
											float: "left",
											paddingRight: ".5em"
										}}
									>
										<Card
											className="white darken-3"
											textClassName="black-text"
											style={{ fontSize: "1.5vw", height: "100%", margin: "0" }}
										>
											<p style={{ textAlign: "center" }}>
												{state.Voted}/{state.Here}
											</p>
											<p style={{ textAlign: "center" }}>Voted {votePercent.toFixed(2)} %</p>
										</Card>
									</Col>
									<Col
										style={{
											width: "50%",
											height: "100%",
											float: "right",
											paddingLeft: ".5em"
										}}
									>
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
								<Row style={{ height: "35%", paddingTop: "2em" }}>
									<Col
										style={{
											width: "50%",
											height: "100%",
											float: "left",
											paddingRight: ".5em"
										}}
									>
										<Card className="grey darken-4 " textClassName="green-text" style={{ height: "100%", margin: "0" }}>
											<Clock
												format={"hh:mm:ss A"}
												ticking
												timezone={"US/Central"}
												style={{
													fontSize: "1.5vw",
													position: "absolute",
													top: "25%",
													left: "25%"
												}}
											/>
										</Card>
									</Col>
									<Col
										style={{
											width: "50%",
											height: "100%",
											float: "right",
											paddingLeft: ".5em"
										}}
									>
										<Button
											waves="dark "
											style={{
												background: "#d0d0d0",
												color: "black",
												width: "100%",
												height: "100%",
												fontSize: "1vw"
											}}
											onClick={this.handleRepoll}
										>
											Repoll Question
										</Button>
									</Col>
								</Row>
							</Container>
						</Row>
					</Col>
				</Row>

				<Row style={{ height: "15%", width: "100%" }}>
					<Button
						waves="light"
						style={{
							width: "9%",
							height: "90%",
							padding: "2em",
							marginLeft: "4%",
							marginRight: ".1%"
						}}
						className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
						onClick={this.handlePrevious}
					>
						<Icon>skip_previous</Icon>
					</Button>

					<Button
						waves="light"
						style={{
							width: "9%",
							height: "90%",
							padding: "2em",
							marginRight: "1%"
						}}
						className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
						onClick={this.handleNext}
					>
						<Icon>skip_next</Icon>
					</Button>

					<Button
						waves="light"
						style={{
							width: "9%",
							height: "90%",
							padding: "2em",
							marginRight: ".1%"
						}}
						className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
						onClick={this.handleLecture}
					>
						Lecture Slice
					</Button>

					<Button
						waves="light"
						style={{
							width: "9%",
							height: "90%",
							padding: "2em",
							marginRight: "1%"
						}}
						className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
						onClick={this.handleQuestion}
					>
						Question Slice
					</Button>
					<Button
						waves="light"
						style={{
							width: "18%",
							height: "90%",
							padding: "2em",
							marginRight: "1%"
						}}
						className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
						onClick={this.handleDifficulty}
					>
						Difficulty: {session ? session.difficulty : ""}
					</Button>

					<Button
						waves="light"
						style={{
							width: "18%",
							height: "90%",
							padding: "2em",
							marginRight: "1%"
						}}
						className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
						onClick={this.handleTopic}
					>
						Topic: {session ? session.topic : ""}
					</Button>

					<Button
						waves="light"
						style={{
							width: "18%",
							height: "90%",
							padding: "2em"
						}}
						className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
						onClick={this.handleHistogram}
					>
						Histogram
					</Button>
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
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = (dispatch) => ({
	nextSlice: (pie) => dispatch(nextSlice(pie)),
	prevSlice: (pie) => dispatch(prevSlice(pie)),
	setPolling: (pie) => dispatch(setPolling(pie)),
	revealAnswer: (pie) => dispatch(revealAnswer(pie)),
	rePoll: (pie) => dispatch(rePoll(pie)),
	changeDifficulty: (pie) => dispatch(changeDifficulty(pie)),
	updateSession: (pie) => dispatch(updateSession(pie))
});

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect(["sessions", "slices"])
)(Presentation);
