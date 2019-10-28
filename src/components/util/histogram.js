import React from "react";
import { Chart } from "react-google-charts";
import { Card } from "react-materialize";

const data = [
  ["Answer", "", { role: "style" }],
  ["A", 10, "color: red"],
  ["B", 14, "color: blue"],
  ["C", 16, "color: green"],
  ["D", 22, "color: orange"]
];



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
        <Chart chartType="BarChart" width="100%" height="auto" data={data} />
      </Card>
    );
  }
}

export default Histogram;
