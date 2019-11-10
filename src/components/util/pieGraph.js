import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Chart } from "react-google-charts";
import { Preloader } from "react-materialize";

class pieGraph extends React.Component {
	render() {
		const { session } = this.props;

		if (!session) {
			return (
				<Chart
					chartType="PieChart"
					loader={<div>Loading Chart</div>}
					style={{ height: "80vh", width: "90vw" }}
					data={[
						["Answer", "Responses"],
						["A: " + session.answer1, !session ? session.respondA1 : 19],
						["B: " + session.answer2, !session ? session.respondA2 : 36],
						["C: " + session.answer3, !session ? session.respondA3 : 3],
						["D: " + session.answer4, !session ? session.respondA4 : 35]
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
	const session = sessions ? sessions[sid] : null;
	return {
		session: session,
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = (dispatch) => ({});

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect(["sessions"])
)(pieGraph);
