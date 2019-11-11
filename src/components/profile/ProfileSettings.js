import React, { Component } from "react";
import firebase from "../../config/fbConfig";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Row, Col, Preloader, Button } from "react-materialize";
import { Redirect } from "react-router-dom";

class ProfileSettings extends Component {
	getStudents = () => {
		firebase
			.firestore()
			.collection("users")
			.where("userRole", "==", "student")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshot.docs.map((doc) => doc.data());
				console.log(data); // array of cities objects
			});
	};

	render() {
		const { props } = this;
		const { user, auth } = props;

		if (user && auth) {
			if (!auth.uid) {
				return <Redirect to="/signin" />;
			}

			return (
				<div className="container section">
					<div className="card z-depth-0 section">
						<div className="card-content row">
							<div className="card-title center-align">
								<Button onClick={this.getStudents}> Log Students</Button>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="section">
					<Row>
						<Col s={12} className="centerloader">
							<Preloader flashing size="big" />
						</Col>
					</Row>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	const { users } = state.firestore.data;
	const user = users ? users[state.firebase.auth.uid] : null;
	return {
		auth: state.firebase.auth,
		user: user,
		users: users
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect(["users"])
)(ProfileSettings);
