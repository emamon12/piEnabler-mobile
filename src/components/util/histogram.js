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
    const { session } = this.props;
    
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
            ["A", session.respondA1, "color: red"],
            ["B", session.respondA2, "color: blue"],
            ["C", session.respondA3, "color: green"],
            ["D", session.respondA4, "color: orange"]
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
  const session = sessions ? sessions[sid] : null;
  return {
    session: session,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => ({});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(["sessions"])
)(Histogram);

