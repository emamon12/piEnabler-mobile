import React, { Component } from "react";
import { Card, Preloader } from "react-materialize";

class ProjectionTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let logo =
      "https://firebasestorage.googleapis.com/v0/b/piesiue.appspot.com/o/darklogo.png?alt=media&token=a1e490df-2474-4ac8-947a-65de362efc4f";
    let slideStyle = {
      position: "absolute",
      top: "0px",
      right: "0px",
      color: "white",
      zIndex: "69",
      fontSize: "x-large",
      padding: "4px",
      backgroundColor: "#6a1b9a",
      borderBottomLeftRadius: "15px"
    };
    let nameStyle = {
      cursor: "default",
      float: "right",
      position: "absolute",
      color: "black",
      bottom: "2%",
      left: "114.5%",
      fontSize: "12px"
    };

    if (this.props.dark) {
      logo =
        "https://firebasestorage.googleapis.com/v0/b/piesiue.appspot.com/o/logo.png?alt=media&token=d9b38104-916b-492f-b128-dd00209cded9";
      nameStyle = {
        cursor: "default",
        float: "right",
        position: "absolute",
        bottom: "2%",
        left: "114.5%",
        fontSize: "12px",
        color: "white"
      };
    }
    return (
      <Card
        className="white "
        textClassName="black-text"
        style={{
          padding: "0em",
          textAlign: "center",
          height: "95%",
          position: "relative"
        }}
      >
        <p style={slideStyle} onClick={this.props.changeMode}>
          {this.props.slide}
        </p>
        <hr style={{ marginBottom: 0 }} />
        <p className="presentation_title">
          {this.props.title && this.props.title}
        </p>
        <div id="body" className="presentation_body class-message">
          {this.props.url ? (
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
              src={this.props.url}
            />
          ) : this.props.question ? (
            this.props.question
          ) : (
            <div style={{ position: "absolute", top: "45%", left: "45%" }}>
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
          <img src={logo} alt="" style={{ height: ".5em" }} />
          <p style={nameStyle}>piEnabler</p>
        </div>
      </Card>
    );
  }
}

export default ProjectionTemplate;
