import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Chart } from "react-google-charts";

class pieGraph extends React.Component {
	render() {
		const { session } = this.props;

		return (
			<Chart
				chartType="PieChart"
				loader={<div>Loading Chart</div>}
				style={{ height: "80vh", width: "90vw" }}
				data={[
					["Answer", "Responses"],
					["A", session ? session.respondA1 : 19],
					["B", session ? session.respondA2 : 36],
					["C", session ? session.respondA3 : 3],
					["D", session ? session.respondA4 : 35]
				]}
				options={{
					is3D: true,
					title: "Results"
				}}
			/>
		);
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
