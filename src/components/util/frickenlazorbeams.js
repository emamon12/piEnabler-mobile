import React, { Component } from "react";
import "./frickenlazorbeams.scss";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import { Preloader } from "react-materialize";
import Fullscreen from "react-full-screen";
import Graph from "./pieGraph";

class frickenlazorbeams extends Component {
	constructor(props) {
		super(props);
		this.state = {
			point: [0, 0],
			trail: [],
			enabled: false,
			firing: true,
			isFull: false,
			slideNumber: 1
		};
	}
	componentDidMount() {
		window.addEventListener("mousemove", this.handleMouseMove);
		window.addEventListener("touchmove", this.handleMouseMove);
		window.addEventListener("keydown", this.handleKeyDown);
		window.addEventListener("keyup", this.handleKeyUp);
		this.animate();
	}
	animate = (now) => {
		requestAnimationFrame(this.animate);
		this.renderCanvas();
	};

	handleMouseMove = (event) => {
		let x = event.clientX || (event.touches ? event.touches[0].clientX : 0),
			y = event.clientY || (event.touches ? event.touches[0].clientY : 0);

		this.setState((state) => ({
			...state,
			point: [x, y]
		}));
	};

	handleKeyUp = (event) => {
		let _arr = ["Space"];

		if (_arr.includes(event.code)) {
			this.setState((state) => ({
				...state,
				enabled: !this.state.enabled
			}));
		}
	};

	handleKeyDown = (event) => {
		console.log(event.code);
	};

	handleTrail = (x, y) => {
		let trail = this.state.trail;

		trail.push({ x: x, y: y });

		if (trail.length > 15) {
			trail.splice(0, trail.length - 15);
		}
	};

	renderTrail = () => {
		return this.state.trail.map((trail, index) => (
			<div
				className={"trail"}
				style={{
					top: trail.y + "px",
					left: trail.x + "px"
				}}
			></div>
		));
	};

	renderPoint = () => (
		<div
			id="point"
			className={this.state.trail ? "point on" : "point"}
			style={{
				top: this.state.point[1] + "px",
				left: this.state.point[0] + "px"
			}}
		></div>
	);

	renderCanvas = () => {
		let y = this.state.point[1];
		let x = this.state.point[0];

		if (y > window.innerHeight + 20) y = -20;
		if (y < -20) y = window.innerHeight + 20;

		if (x > window.innerWidth + 20) x = -20;
		if (x < -20) x = window.innerWidth + 20;

		if (this.state.firing) this.handleTrail(x, y);
	};

	goFull = () => {
		this.setState({ isFull: !this.state.isFull });
	};

	nextSlide = () => {
		this.setState({ slideNumber: this.state.slideNumber + 1 });
	};
	prevSlide = () => {
		this.setState({ slideNumber: this.state.slideNumber - 1 });
	};

	render() {
		const { session, authError, auth } = this.props;

		if (authError) {
			console.log(authError);
		}

		if (!auth.uid) {
			return <Redirect to="/" />;
		}

		let style = this.state.enabled ? "lazor" : "";

		let logo =
			"https://firebasestorage.googleapis.com/v0/b/piesiue.appspot.com/o/darklogo.png?alt=media&token=a1e490df-2474-4ac8-947a-65de362efc4f";
		let numStyle = { fontSize: "1em", color: "black", position: "absolute", bottom: "2%", right: "2%" };
		let nameStyle = { cursor: "default", float: "right", position: "absolute", bottom: "2%", left: "114.5%", color: "black" };

		if (session.dark) {
			logo = "https://firebasestorage.googleapis.com/v0/b/piesiue.appspot.com/o/logo.png?alt=media&token=d9b38104-916b-492f-b128-dd00209cded9";
			numStyle = { fontSize: "1em", color: "white", position: "absolute", bottom: "2%", right: "2%" };
			nameStyle = { cursor: "default", float: "right", position: "absolute", bottom: "2%", left: "114.5%", fontSize: "12px", color: "white" };
		}

		return (
			<div className={style}>
				<div style={{ margin: "1em", padding: "0" }}>
					<Fullscreen enabled={this.state.isFull}>
						<div className="white" style={{ position: "relative", height: "100%" }}>
							{session && session.displayGraph ? (
								<Graph sid={this.props.sessionId} />
							) : session.slice.url && !this.state.isFull ? (
								<img
									style={{
										position: "absolute",
										top: "0px",
										left: "0px",
										right: "0px",
										width: "100%",
										height: "100%"
									}}
									alt=""
									src={session.slice.url}
								/>
							) : session.slice.url && this.state.isFull ? (
								<img style={{ height: "100vh", width: "100%" }} alt="" src={session.slice.url} />
							) : (
								<div>
									<h3 className="projection_title">{session && session.slice.title ? session.slice.title : ""}</h3>
									<div id="body" className="projection_body class-message">
										{session && session.slice.question ? (
											session.slice.question
										) : (
											<div style={{ textAlign: "center", marginTop: "15%" }}>
												<Preloader flashing size="big" />
											</div>
										)}
									</div>
								</div>
							)}
						</div>

						{this.state.isFull ? (
							<CancelPresentationIcon
								style={{
									fontSize: "4em",
									color: "red",
									position: "absolute",
									top: "2%",
									right: "1%"
								}}
								onClick={this.goFull}
							/>
						) : (
							<AspectRatioIcon
								style={{
									fontSize: "4em",
									color: "red",
									position: "absolute",
									top: "1%",
									right: "1.5%"
								}}
								onClick={this.goFull}
							/>
						)}

						<div
							style={{
								fontSize: "4em",
								color: "black",
								position: "absolute",
								bottom: "2%",
								left: "1%",
								display: "inline"
							}}
						>
							<img src={logo} alt="" style={{ height: "1em" }} />
							<h3 style={nameStyle}>piEnabler</h3>
						</div>
						<div style={numStyle}>
							<h1>{session && session.sliceNumber ? session.sliceNumber : ""}</h1>
						</div>

						{this.state.enabled ? this.renderPoint() : null}
						{this.state.enabled ? this.renderTrail() : null}
					</Fullscreen>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { id } = ownProps.match.params;
	const { sessions, slices } = state.firestore.data;
	const session = sessions ? sessions[id] : null;
	return {
		session: session,
		slices: slices,
		sessionId: id,
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = (dispatch) => ({});

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect(["sessions", "slices"])
)(frickenlazorbeams);
