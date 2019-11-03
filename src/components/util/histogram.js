import React from "react";
import { Chart } from "react-google-charts";
import { Card } from "react-materialize";

const data = [
  ["Answer", "", { role: "style" }],
  ["A", 10, "color: red"],
  ["B", 15, "color: blue"],
  ["C", 50, "color: green"],
  ["D", 25, "color: orange"]
];

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
          data={data}
          options={options}
        />
      </Card>
    );
  }
}

export default Histogram;
