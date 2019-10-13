import React, { Component } from "react";
import { connect } from "react-redux";
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

  render() {
    const { auth, authError } = this.props;
    console.log(authError);

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    return (
      <div style={{ margin: "1em", padding: "0" }}>
        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({ isFull })}
        >
          <Card
            className="white full-screenable-node"
            textClassName="black-text"
            title="Slide 1"
            style={{ height: "100%", position: "relative" }}
            onClick={this.goFull}
          >
            This a bunch of drunkenly typed text that should show up on a
            fullscreen projetion view fingers crossed. This may cover the entire
            monitor.
          </Card>
          {this.state.isFull ? (
            <CancelPresentationIcon
              style={{
                fontSize: "xxx-large",
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
                fontSize: "xxx-large",
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
              fontSize: "xxx-large",
              color: "black",
              position: "absolute",
              bottom: "2%",
              left: "2%",
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
                bottom: "-6%",
                position: "absolute",
                left: "118%"
              }}
            >
              piEnabler
            </h3>
          </div>

          <div
            style={{
              fontSize: "xxx-large",
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

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projection);
