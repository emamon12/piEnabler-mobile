/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Container from "muicss/lib/react/container";
import Row from "muicss/lib/react/row";
import Col from "muicss/lib/react/col";
import { Card, Button } from "react-materialize";
import Clock from "react-live-clock";

class Presentation extends Component {
  state = {
    view: null,
    PollingStatus: false,
    Voted: 83,
    Here: 150
  };

  handleChange = e => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value
    }));
  };

  HandleLectureChange = e => {
    const { target } = e;
    console.log(target.checked);
    console.log(target.id);

    this.setState(state => ({
      ...state,
      [target.id]: target.checked
    }));
  };

  handlePolling = e => {
    const { target } = e;

    this.setState(state => ({
        ...state,
        [target.id]: !state.PollingStatus
      }));
  }

  handleResetPolling = () => {
      this.setState(state => ({
        ...state,
        Voted: 0
      }));
  }

  handleSubmit = e => {
    e.preventDefault();
    const { props, state } = this;
    props.createSlice(state);
    //the push acts as a redirect... when the form is submitted... redirect to home
    props.history.push("/createSlice");
  };

  render() {
    const { session, auth, authError } = this.props;
    let state = this.state;
    console.log(authError);

    if (!auth.uid) {
      //return <Redirect to="/signin" />;
    }

    var votePercent = (state.Voted / state.Here) * 100

    const StyleOpen = {
      fontSize: "1vw",
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "black",
      background: "rgb(102, 255, 97)"
    };
    const StyleClosed = {
      fontSize: "1vw",
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      background: "#ff6161"
    };

    return (
      <Container
        fluid={true}
        style={{
          width: "95vw",
          height: "90vh",
          background: "white",
          marginTop: "1em"
        }}
      >
        <Row style={{ height: "85%" }}>
          <Col
            md="4"
            style={{
              paddingRight: "4%",
              paddingLeft: "3%",
              paddingTop: "2%",
              height: "95%"
            }}
          >
            <Card
              className="white darken-3"
              textClassName="black-text"
              title="Phone View"
              style={{ height: "100%", position: "relative" }}
            >
              <div
                className="collection card-content"
                onClick={this.handleListClick}
                style={{ height: "100%" }}
              >
                <a
                  id="answer1"
                  name="answer1"
                  href="#!"
                  className="collection-item black-text"
                >
                  answer1
                </a>
                <a
                  id="answer2"
                  name="answer2"
                  href="#!"
                  className="collection-item black-text"
                >
                  answer2
                </a>
                <a
                  id="answer3"
                  name="answer3"
                  href="#!"
                  className="collection-item black-text"
                >
                  answer3
                </a>
                <a
                  id="answer4"
                  name="answer4"
                  href="#!"
                  className="collection-item black-text"
                >
                  answer4
                </a>
              </div>
              <Button
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "2%",
                  background: "grey"
                }}
                waves="light"
              >
                display
              </Button>
            </Card>
          </Col>
          <Col
            md="4"
            style={{ paddingRight: "3em", height: "90%", marginTop: "2%" }}
          >
            <Row style={{ height: "50%" }}>
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
                <Card
                  className="white"
                  textClassName="black-text fit"
                  style={{ height: "100%", padding: "0px" }}
                >
                  Sample Text
                </Card>
              </Card>
            </Row>
            <Row style={{ height: "50%" }}>
              <Card
                className="white "
                textClassName="black-text"
                title="Next Slide"
                style={{
                  padding: "0em",
                  textAlign: "center",
                  height: "80%"
                }}
              >
                <Card
                  className="white"
                  textClassName="black-text fit"
                  style={{ height: "100%", padding: "0px" }}
                >
                  Sample Text
                </Card>
              </Card>
            </Row>
          </Col>
          <Col
            md="4"
            style={{ paddingRight: "3em", height: "95%", marginTop: "2%" }}
          >
            <Row style={{ height: "50%" }}>
              <Card
                className="white "
                textClassName="black-text"
                title="Histogram"
                style={{
                  padding: "0em",
                  textAlign: "center",
                  height: "80%"
                }}
              >
                <Card
                  className="white"
                  textClassName="black-text fit"
                  style={{ height: "90%", padding: "0px" }}
                >
                  Sample Graph
                </Card>
              </Card>
            </Row>
            <Row style={{ height: "50%" }}>
              <Container style={{ height: "100%" }}>
                <Row style={{ height: "35%" }}>
                  <Col
                    style={{
                      width: "50%",
                      height: "100%",
                      float: "left",
                      paddingRight: ".5em"
                    }}
                  >
                    <Card
                      className="white darken-3"
                      textClassName="black-text"
                      style={{ fontSize: "1.5vw", height: "100%" }}
                    >
                      <p>{state.Voted}/{state.Here}</p>
                      <p>Voted {votePercent.toFixed(2)} %</p>
                    </Card>
                  </Col>
                  <Col
                    style={{
                      width: "50%",
                      height: "100%",
                      float: "right",
                      paddingLeft: ".5em"
                    }}
                  >
                    {state.PollingStatus ? (
                      <Button
                        waves="light"
                        style={StyleOpen}
                        onClick={this.handlePolling}
                        id="PollingStatus"
                      >
                        Polling Status : OPEN
                      </Button>
                    ) : (
                      <Button
                        waves="dark"
                        style={StyleClosed}
                        onClick={this.handlePolling}
                        id="PollingStatus"
                      >
                        Polling Status : CLOSED
                      </Button>
                    )}
                  </Col>
                </Row>
                <Row style={{ height: "35%", paddingTop: "2em" }}>
                  <Col
                    style={{
                      width: "50%",
                      height: "100%",
                      float: "left",
                      paddingRight: ".5em"
                    }}
                  >
                    <Card
                      className="white darken-3"
                      textClassName="black-text"
                      style={{ height: "100%", margin: "0" }}
                    >
                      <Clock
                        format={"hh:mm:ss A"}
                        ticking={true}
                        timezone={"US/Central"}
                        style={{
                          fontSize: "1.5vw",
                          position: "absolute",
                          top: "25%",
                          left: "25%"
                        }}
                      />
                    </Card>
                  </Col>
                  <Col
                    style={{
                      width: "50%",
                      height: "100%",
                      float: "right",
                      paddingLeft: ".5em"
                    }}
                  >
                    <Button
                      waves="dark "
                      style={{
                        background: "#d0d0d0",
                        color: "black",
                        width: "100%",
                        height: "100%",
                        fontSize: "1vw"
                      }}
                      onClick={this.handleResetPolling}
                    >
                      Reset Polling
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Col>
        </Row>

        <Row style={{ height: "15%", width: "100%" }}>
          <Button
            waves="light"
            style={{
              background: "red",
              width: "19%",
              height: "90%",
              padding: "2em",
              marginRight: "1%",
              marginLeft: "1%"
            }}
            onClick={this.handleLecture}
          >
            Lecture Material
          </Button>

          <Button
            waves="light"
            style={{
              background: "red",
              width: "19%",
              height: "90%",
              padding: "2em",
              marginRight: "1%"
            }}
            onClick={this.handleQuestion}
          >
            Next Question
          </Button>

          <Button
            waves="light"
            style={{
              background: "red",
              width: "19%",
              height: "90%",
              padding: "2em",
              marginRight: "1%"
            }}
            onClick={this.handleDifficulty}
          >
            Change Difficulty
          </Button>

          <Button
            waves="light"
            style={{
              background: "red",
              width: "19%",
              height: "90%",
              padding: "2em",
              marginRight: "1%"
            }}
            onClick={this.handleTopic}
          >
            New Topic
          </Button>

          <Button
            waves="light"
            style={{
              background: "red",
              width: "19%",
              height: "90%",
              padding: "2em"
            }}
            onClick={this.handleHistogram}
          >
            Histogram
          </Button>
        </Row>
      </Container>
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
)(Presentation);