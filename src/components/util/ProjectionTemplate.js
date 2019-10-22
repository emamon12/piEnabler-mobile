import React, { Component } from "react";
import { Card, Preloader } from "react-materialize";

class ProjectionTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Card
      className="white "
      textClassName="black-text"
      title="Current Slide"
      style={{
        padding: "0em",
        textAlign: "center",
        height: "80%"
      }}
    >
      <div style={{ margin: "0", padding: "0", height: "100%", position: "relative" }}>
        <Card
          className="white"
          textClassName="black-text"
          style={{  }}
        >
          <h3 className="projection_title">
            {this.props.title ? this.props.title : "Loading..."}
          </h3>
          <div id="body" className="projection_body">
            {this.props.question ? (
              this.props.question
            ) : (
              <Preloader flashing size="big" />
            )}
          </div>
        </Card>

        <div
          style={{
            fontSize: "4em",
            color: "black",
            position: "absolute",
            bottom: "-8%",
            left: "1%",
            display: "inline"
          }}
        >
          <img src="../../../darklogo.png" alt="" style={{ height: ".5em" }} />
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
      </div>
      </Card>
    );
  }
}

export default ProjectionTemplate;
