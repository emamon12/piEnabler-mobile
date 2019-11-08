/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect, getFirestore } from "react-redux-firebase";
import { compose } from "redux";
import Container from "muicss/lib/react/container";
import Row from "muicss/lib/react/row";
import Col from "muicss/lib/react/col";
import { Card, Button, Preloader } from "react-materialize";
import Clock from "react-live-clock";
import ProjectionTemplate from "../util/ProjectionTemplate";
import Histogram from "../util/histogram";
import { nextSlice } from "../../store/actions/sessionActions"
import { prevSlice } from "../../store/actions/sessionActions"


class Presentation extends Component {
  state = {
    view: null,
    PollingStatus: false,
    correct: null,
    Voted: 83,
    Here: 150,
    Question:
      "This is just at test of how many words you can fit onto one slide it is apparently not going to fill up too much because this is going to be the best powerpoint clone that the world has ever seen",
    Title: "Welcome to CS 140"
  };

  handlePolling = e => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: !state.PollingStatus
    }));
  };

  handleResetPolling = () => {
    console.log("Reset Clicked");
    this.setState(state => ({
      ...state,
      Voted: 0
    }));
  };

  handleLecture = () => {
    const { props, state } = this;
    const { sessionId } = props;

    props.prevSlice(sessionId)
    console.log("Lecture Clicked");
  };

  handleQuestion = (e) => {
    e.preventDefault();
    const { props, state } = this;
    const { sessionId } = props;

    props.nextSlice(sessionId)
    
    console.log("Question Clicked");
  };

  handleDifficulty = () => {
    if(session.difficulty == 'easy') {
      session.difficulty = 'hard';
    } else {
      session.difficulty = 'easy';
    }
    
    console.log("Difficulty Clicked");
  };

  handleTopic = () => {
    console.log("Topic Clicked");
  };

  handleHistogram = () => {
    
    console.log("Histogram Clicked");
  };

  render() {
    const { session, auth, authError, slices } = this.props;
    let state = this.state;
    //console.log(authError);

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    var votePercent = (state.Voted / state.Here) * 100;

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
          background: "#4911623d none repeat scroll 0% 0%",
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
                  {session && session.isCurrentSliceAQuestion
                    ? session.answer1
                    : ""}
                </a>
                <a
                  id="answer2"
                  name="answer2"
                  href="#!"
                  className="collection-item black-text"
                >
                  {session && session.isCurrentSliceAQuestion
                    ? session.answer2
                    : ""}
                </a>
                <a
                  id="answer3"
                  name="answer3"
                  href="#!"
                  className="collection-item black-text"
                >
                  {session && session.isCurrentSliceAQuestion
                    ? session.answer3
                    : ""}
                </a>
                <a
                  id="answer4"
                  name="answer4"
                  href="#!"
                  className="collection-item black-text"
                >
                  {session && session.isCurrentSliceAQuestion
                    ? session.answer4
                    : ""}
                </a>
              </div>
              <Button
                style={{
                  position: "absolute",
                  left: "40%",
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
            <Row style={{ height: "50%", marginBottom: "1em" }}>
              <ProjectionTemplate
                slide={session.sliceId}
                question={session.question}
                title={session.title}
              />
            </Row>
            <Row style={{ height: "50%", marginBottom: "-1em" }}>
              <ProjectionTemplate
                slide="Next Slide"
                question={session.question}
                title={session.title}
              />
            </Row>
          </Col>
          <Col
            md="4"
            style={{ paddingRight: "3em", height: "95%", marginTop: "2%" }}
          >
            <Row style={{ height: "50%" }}>
              <Histogram sid={this.props.sessionId}/>
            </Row>
            <Row style={{ height: "50%", marginTop: "3em" }}>
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
                      style={{ fontSize: "1.5vw", height: "100%", margin: "0" }}
                    >
                      <p style={{ textAlign: "center" }}>
                        {state.Voted}/{state.Here}
                      </p>
                      <p style={{ textAlign: "center" }}>
                        Voted {votePercent.toFixed(2)} %
                      </p>
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
                      className="grey darken-4 "
                      textClassName="green-text"
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
              width: "19%",
              height: "90%",
              padding: "2em",
              marginRight: "1%",
              marginLeft: "1%"
            }}
            className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
            onClick={this.handleLecture}
          >
            Lecture Material
          </Button>

          <Button
            waves="light"
            style={{
              width: "19%",
              height: "90%",
              padding: "2em",
              marginRight: "1%"
            }}
            className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
            onClick={this.handleQuestion}
          >
            New Question
          </Button>

          <Button
            waves="light"
            style={{
              width: "19%",
              height: "90%",
              padding: "2em",
              marginRight: "1%"
            }}
            className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
            onClick={this.handleDifficulty}
          >
            Change Difficulty: {session ? session.difficulty : ''}
          </Button>

          <Button
            waves="light"
            style={{
              width: "19%",
              height: "90%",
              padding: "2em",
              marginRight: "1%"
            }}
            className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
            onClick={this.handleTopic}
          >
            New Topic: {session ? session.topic : ''}
          </Button>

          <Button
            waves="light"
            style={{
              width: "19%",
              height: "90%",
              padding: "2em"
            }}
            className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
            onClick={this.handleHistogram}
          >
            Histogram
          </Button>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id, cid } = ownProps.match.params;
  const { classes } = state.firestore.data;
  const { sessions, slices } = state.firestore.data;
  const pie = classes ? classes[id] : null
  const session = sessions ? sessions[id] : null;
  return {
    pie: pie,
    classId: cid,
    sessionId: id,
    session: session,
    slices: slices,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => ({
  nextSlice: pie => dispatch(nextSlice(pie)),
  prevSlice: pie => dispatch(prevSlice(pie)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(["sessions", "slices"])
)(Presentation);
