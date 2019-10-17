import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import { Card, Button } from "react-materialize";
import Fullscreen from "react-full-screen";

class Projection extends Component {
  state = {
    isFull: false,
    slideNumber: 1
  };

  goFull = () => {
    this.setState({ isFull: !this.state.isFull });
  };

  nextSlide = () => {
    this.setState({ slideNumber: this.state.slideNumber + 1 });
  };
  prevSlide = () => {
    this.setState({ slideNumber: this.state.slideNumber - 1 });
  };

  render() {
    const { session, auth, authError } = this.props;
    console.log(authError);

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    return (
      <div style={{ margin: "1em", padding: "0" }}>
        <Fullscreen enabled={this.state.isFull}>
          <Card
            className="white full-screenable-node"
            textClassName="black-text"
            style={{ height: "100%", position: "relative" }}
            onClick={this.nextSlide}
          >
          <h3 className="projection_title">Welcome to CS 140</h3>
            <div id="body" className="projection_body" >
              {session && session.question
                ? session.question
                : "No Session Active"}
            </div>
          </Card>
          {this.state.isFull ? (
            <CancelPresentationIcon
              style={{
                fontSize: "4em",
                color: "red",
                position: "absolute",
                top: "1%",
                right: "1%"
              }}
              onClick={this.goFull}
            />
          ) : (
            <AspectRatioIcon
              style={{
                fontSize: "4em",
                color: "red",
                position: "absolute",
                top: "1%",
                right: "1%"
              }}
              onClick={this.goFull}
            />
          )}
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
              src="https://i.imgur.com/cwulpWU.png"
              alt=""
              style={{ height: "1em" }}
            />
            <h3
              style={{
                cursor: "default",
                float: "right",
                bottom: "-7%",
                position: "absolute",
                left: "118%"
              }}
            >
              piEnabler
            </h3>
          </div>

          <div
            style={{
              fontSize: "1em",
              color: "black",
              position: "absolute",
              bottom: "2%",
              right: "2%"
            }}
          >
            <h1>{this.state.slideNumber}</h1>
          </div>
        </Fullscreen>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
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
)(Projection);
