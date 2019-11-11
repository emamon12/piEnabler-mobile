import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Chart } from "react-google-charts";
import { Card } from "react-materialize";
const options = {
	chartArea: { width: "80%" },
	legend: "none",
	hAxis: {
		title: "Voting Percentage",
		minValue: 0,
		maxValue: 100
	},
	vAxis: {
		title: "Responses"
	}
};

class Histogram extends React.Component {
	render() {
		const { session, responses } = this.props;

		var numResponses = 0;
		var response1 = 0;
		var response2 = 0;
		var response3 = 0;
		var response4 = 0;

		if (responses) {
			for (var resp in responses) {
				var rRef = responses[resp];

				if (rRef.response === "answer1") {
					response1++;
				} else if (rRef.response === "answer2") {
					response2++;
				} else if (rRef.response === "answer3") {
					response3++;
				} else if (rRef.response === "answer4") {
					response4++;
				}
				numResponses++;
			}
		}

		return (
			<Card
				className="white "
				textClassName="black-text"
				title="Histogram"
				style={{
					padding: "0em",
					textAlign: "center",
					height: "85%",
					marginTop: "2em",
					position: "relative"
				}}
			>
				<hr style={{ marginBottom: "0" }} />
				<Chart
					chartType="BarChart"
					width="100%"
					height="auto"
					style={{
						position: "absolute",
						top: "25%"
					}}
					data={[
						["Answer", "", { role: "style" }],
						["A", response1, "color: red"],
						["B", response2, "color: blue"],
						["C", response3, "color: green"],
						["D", response4, "color: orange"]
					]}
					options={options}
				/>
			</Card>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { sid } = ownProps;
	const { sessions } = state.firestore.data;
	const responses = state.firestore.data[`sessions/${sid}/responses`];
	const session = sessions ? sessions[sid] : null;

	return {
		session: session,
		auth: state.firebase.auth,
		responses: responses,
		id: sid
	};
};

const fbCompose = compose(
	connect(mapStateToProps),
	firestoreConnect((props) => {
		if (!props.id || !props.session) {
			return [];
		} else {
			return [
				{
					collection: `sessions/${props.id}/responses`,
					where: ["responseReference", "==", `${props.id}${props.session.currentSliceId}${props.session.numPolls}`]
				}
			];
		}
	})
);

export default compose(
	connect(
		mapStateToProps,
		null
	),
	fbCompose
)(Histogram);
