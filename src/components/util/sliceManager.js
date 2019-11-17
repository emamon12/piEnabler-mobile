/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import firebase from "firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Row, Col, Preloader, Button } from "react-materialize";

class sliceManager extends Component {
	state = {
		sliceId: ""
	};

	handleDelete = (e, id) => {
		let { slices } = this.props;

		let deleteSlice = slices.filter((slice) => {
			return slice.id === id;
		})[0];

		if (deleteSlice.filename) {
			console.log(deleteSlice.filename);
			firebase
				.storage()
				.ref()
				.child("images/" + deleteSlice.filename)
				.delete()
				.then(function() {
					console.log("image successfully deleted!");
				})
				.catch(function(error) {
					console.error("Error removing image: ", error);
				});
		}
		firebase
			.firestore()
			.collection("slices")
			.doc(id)
			.delete()
			.then(function() {
				console.log("slice successfully deleted!");
			})
			.catch(function(error) {
				console.error("Error removing slice: ", error);
			});
	};

	displaySlice = (e, data) => {
		console.log(data);
		this.setState((state) => ({
			...state,
			sliceId: data
		}));
	};

	render() {
		//just check if the user is authenticated
		const { props } = this;
		const { auth, user, slices } = props;

		if (user && user.userRole === "student") {
			return <Redirect to="/" />;
		}

		let sliceFilter;
		if (slices) {
			sliceFilter = slices;
		}

		if (user && user.userRole === "instructor" && slices) {
			sliceFilter = slices.filter((slice) => {
				return slice.createdBy === auth.uid;
			});
		}

		const textStyle = "grey-text text-darken-3";

		let selectedSlice;
		if (this.state.sliceId) {
			selectedSlice = sliceFilter.filter((slice) => {
				return slice.id === this.state.sliceId;
			})[0];
		}

		return (
			<div className="dashboard">
				<div id="plan-session-row" className="row">
					<div id="slice-list" className="col s12 m5 offset-m1 ease-in-anim">
						{slices && auth ? (
							<div className="slice-list-children ease-in-anim section">
								{sliceFilter.map((slice) => {
									return (
										<div style={{ minHeight: "10em" }} className="card z-depth-0 classs-summary">
											<div className="card-content black-text ">
												<p>
													<b>Slice ID:</b> {slice.id}
													<Button
														onClick={(e) => this.displaySlice(e, slice.id)}
														waves="light"
														style={{
															right: "1.5em",
															position: "absolute",
															backgroundColor: "#6a1b9a",
															width: "6.5em"
														}}
														className="btn"
													>
														Display Slice
													</Button>
													<Button
														onClick={(e) => this.handleDelete(e, slice.id)}
														waves="light"
														style={{
															right: "1.5em",
															top: "5.5em",
															position: "absolute",
															backgroundColor: "red",
															width: "6.5em"
														}}
														className="btn"
													>
														Delete Slice
													</Button>
												</p>
												<span className="card-title">{slice.Title}</span>
												<span className="card-title">{slice.filename}</span>
												{slice.Cheese ? (
													<p>Image Slice</p>
												) : slice.Lecture === true ? (
													<p>Lecture Slice: {slice.Title && slice.Title}</p>
												) : (
													<p>Question Slice: {slice.Question && slice.Question}</p>
												)}
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<div className="section">
								<Row>
									<Col s={12} className="centerloader">
										<Preloader flashing size="big" />
									</Col>
								</Row>
							</div>
						)}
					</div>
					<div id="" className="col s12 m5 offset-m1">
						<div className="white" style={{ height: "60vh", marginTop: "5em", position: "relative" }}>
							{selectedSlice && selectedSlice.Cheese ? (
								<div className="white">
									<h5 className={textStyle}>Slice ID: {this.state.sliceId}</h5>
									<h2 className={textStyle}>{selectedSlice.Title}</h2>
									<br />

									<span>
										<h3 className={textStyle}>Filename: {selectedSlice.filename} </h3>
										<div style={{ textAlign: "center" }}>
											<img
												style={{
													height: "40vh",
													border: "solid #242222b5 3px",
													padding: "1em",
													borderRadius: "1.5em"
												}}
												alt=""
												src={selectedSlice.url}
											/>
										</div>
										<br />
										<p>Topic: {selectedSlice.Topic}</p>
									</span>
								</div>
							) : selectedSlice && selectedSlice.Lecture === true ? (
								<div className="white">
									<h5 className={textStyle}>Slice ID: {this.state.sliceId}</h5>
									<h2 className={textStyle}>{selectedSlice.Title}</h2>
									<br />

									<span>
										<h3 className={textStyle}>Content: </h3>
										<p className={textStyle}>{selectedSlice.Question}</p>
										<br />
										<p>Topic: Yeet</p>
									</span>
								</div>
							) : selectedSlice && selectedSlice.Lecture === false ? (
								<div className="white">
									<h5 className={textStyle}>Slice ID: {this.state.sliceId}</h5>
									<h2 className={textStyle}>{selectedSlice.Title}</h2>
									<br />
									<span>
										<h3 className={textStyle}>Question: </h3>
										<p className="grey-text text-darken-3 class-message">{selectedSlice.Question}</p>
										<h3 className={textStyle}>Answers </h3>
										<p>Answer 1: {selectedSlice.Answer1}</p>
										<p>Answer 2: {selectedSlice.Answer2}</p>
										<p>Answer 3: {selectedSlice.Answer3}</p>
										<p>Answer 4: {selectedSlice.Answer4}</p>
										<p>Correct Answer: {selectedSlice.CorrectAnswer}</p>
										<p>
											<br />
										</p>
										<p>Topic: {selectedSlice.Topic}</p>
										<p>Difficulty: {selectedSlice.Difficulty}</p>
									</span>
								</div>
							) : (
								<div style={{ top: "45%", left: "50%", position: "absolute" }} className="centerloader">
									<Preloader flashing size="big" />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { id } = ownProps.match.params;
	const { users } = state.firestore.data;
	const user = users ? users[id] : null;
	return {
		auth: state.firebase.auth,
		user: user,
		slices: state.firestore.ordered.slices,
		id: id
	};
};
const mapDispatchToProps = (dispatch) => ({});

const fbCompose = compose(
	connect(mapStateToProps),
	firestoreConnect((props) => {
		if (!props.auth.uid) {
			return [];
		} else {
			return [`users/${props.auth.uid}`, { collection: "slices", orderBy: ["createdAt", "desc"] }];
		}
	})
);

export default compose(connect(mapStateToProps, mapDispatchToProps), fbCompose)(sliceManager);
