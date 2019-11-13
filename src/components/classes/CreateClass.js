/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createClass } from "../../store/actions/classActions";
import { Checkbox } from "react-materialize";
import Container from "muicss/lib/react/container";
import Col from "muicss/lib/react/col";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";

class CreateClass extends Component {
	state = {
		classsName: "",
		classSection: "",
		classIdentifier: "",
		classLecture: "",
		time: ["8:00", "9:15"]
	};

	handleChange = (e) => {
		const { target } = e;

		this.setState((state) => ({
			...state,
			[target.id]: target.value
		}));
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { props, state } = this;
		let tmp = state;
		let lecture = this.buildLecture();
		tmp.classLecture = lecture;
		delete tmp.time;
		delete tmp.M;
		delete tmp.T;
		delete tmp.W;
		delete tmp.R;
		delete tmp.F;
		props.createClass(tmp);
		//the push acts as a redirect... when the form is submitted... redirect to home
		props.history.push("/");
	};

	buildLecture = () => {
		let tmp = "";
		if (this.state.M) {
			tmp += "M";
		}
		if (this.state.T) {
			tmp += "T";
		}
		if (this.state.W) {
			tmp += "W";
		}
		if (this.state.R) {
			tmp += "R";
		}
		if (this.state.F) {
			tmp += "F";
		}
		if (this.state.time) {
			tmp += " " + this.state.time[0] + "-" + this.state.time[1];
		}
		return tmp;
	};
	handleTime = (time) => this.setState({ time });
	handleDate = (name) => (event) => {
		this.setState({ ...this.state, [name]: event.target.checked });
	};

	render() {
		//just check if the user is authenticated
		const { auth, profile } = this.props;
		if (!auth.uid) {
			return <Redirect to="/landing" />;
		}

		if (profile.userRole !== "admin" && profile.userRole !== "instructor") {
			return <Redirect to="/"></Redirect>;
		}

		return (
			<div className="container section">
				<form onSubmit={this.handleSubmit} className="white">
					<h2 className="grey-text text-darken-3" style={{ textAlign: "center" }}>
						Create A New class
					</h2>
					<div className="input-field">
						<label htmlFor="classsName">Class Name</label>
						<input type="text" name="classsName" id="classsName" autoComplete="off" required onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="classsIdentifier">Class Identifier</label>
						<input type="text" name="classIdentifier" id="classIdentifier" autoComplete="off" required onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="classSection">Class Section</label>
						<input type="text" name="classSection" id="classSection" autoComplete="off" required onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<div>
							<label htmlFor="classLecture">Class Lecture </label>
							<Container fluid={true}>
								<Col md="2">
									<ul>
										<li>
											<Checkbox value="M" label="Monday" onChange={this.handleDate("M")} />
										</li>
										<li>
											<Checkbox value="T" label="Tuesday" onChange={this.handleDate("T")} />
										</li>
										<li>
											<Checkbox value="W" label="Wednesday" onChange={this.handleDate("W")} />
										</li>
										<li>
											<Checkbox value="R" label="Thursday" onChange={this.handleDate("R")} />
										</li>
										<li>
											<Checkbox value="F" label="Friday" onChange={this.handleDate("F")} />
										</li>
									</ul>
								</Col>
								<Col md="6">
									<TimeRangePicker id="classLecture" onChange={this.handleTime} format="HH:mm" value={this.state.time} />
								</Col>
							</Container>
						</div>
					</div>
					<div className="input-field">
						<button type="submit" className="btn purple-bg purple darken-3 z-depth-1">
							Add
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile
});

const mapDispatchToProps = (dispatch) => ({
	createClass: (classs) => dispatch(createClass(classs))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateClass);
