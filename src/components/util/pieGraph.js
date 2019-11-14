import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Chart } from "react-google-charts";
import { Preloader } from "react-materialize";

class pieGraph extends React.Component {
	render() {
		const { session, responses } = this.props;

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
			}
		}

		if (session && responses) {
			return (
				<Chart
					chartType="PieChart"
					loader={<div>Loading Chart</div>}
					style={{ height: "80vh", width: "90vw" }}
					data={[
						["Answer", "Responses"],
						["A: " + session.answer1, response1],
						["B: " + session.answer2, response2],
						["C: " + session.answer3, response3],
						["D: " + session.answer4, response4]
					]}
					options={{
						is3D: true,
						title: "Results"
					}}
				/>
			);
		} else {
			return (
				<div
					style={{
						position: "absolute",
						top: "44vh",
						left: "49vw"
					}}
				>
					<Preloader />
				</div>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	const { sid } = ownProps;
	const { sessions } = state.firestore.data;
	const responses = state.firestore.data["responses"];
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
					where: ["responseReference", "==", `${props.id}${props.session.currentSliceId}${props.session.numPolls}`],
					storeAs: "responses"
				}
			];
		}
	})
);

export default compose(connect(mapStateToProps, null), fbCompose)(pieGraph);
