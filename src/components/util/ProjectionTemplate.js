import React, { Component } from "react";
import { Card, Preloader } from "react-materialize";

class ProjectionTemplate extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	
	render() {
		const brandImage =
		"https://firebasestorage.googleapis.com/v0/b/piesiue.appspot.com/o/darklogo.png?alt=media&token=a1e490df-2474-4ac8-947a-65de362efc4f";
		return (
			<Card
				className="white "
				textClassName="black-text"
				title={this.props.slide}
				style={{
					padding: "0em",
					textAlign: "center",
					height: "95%",
					position: "relative"
				}}
			>
				<hr style={{ marginBottom: 0 }} />
				<p className="presentation_title">{this.props.title && this.props.title}</p>
				<div id="body" className="presentation_body class-message">
					{this.props.url ? (
						<img style={{ height: "23vh", width: "100%" }} alt="" src={this.props.url} />
					) : this.props.question ? (
						this.props.question
					) : (
						<div style={{ textAlign: "center", marginTop: "15%" }}>
							<Preloader flashing size="big" />
						</div>
					)}
				</div>

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
					<img
						src={brandImage}
						alt=""
						style={{ height: ".5em" }}
					/>
					<p
						style={{
							cursor: "default",
							float: "right",
							position: "absolute",
							bottom: "2%",
							left: "114.5%",
							fontSize: "12px"
						}}
					>
						piEnabler
					</p>
				</div>
				<div
					style={{
						fontSize: "1em",
						color: "black",
						position: "absolute",
						bottom: "2%",
						right: "2%"
					}}
				></div>
			</Card>
		);
	}
}

export default ProjectionTemplate;
