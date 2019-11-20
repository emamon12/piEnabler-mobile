/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Container from "muicss/lib/react/container";
import Row from "muicss/lib/react/row";
import Col from "muicss/lib/react/col";
import { Card, Button, Icon } from "react-materialize";
import Clock from "react-live-clock";
import ProjectionTemplate from "../util/ProjectionTemplate";
import Histogram from "../util/histogram";
import {
  nextSlice,
  prevSlice,
  rePoll,
  setPolling,
  revealAnswer,
  changeDifficulty,
  updateSession,
  displayGraph,
  getNextSlice,
  changeMode
} from "../../store/actions/dashboardActions";
import Stopwatch from "../util/stopwatch";

class Presentation extends Component {
  state = {
    view: null,
    Voted: 0,
    fetch: true,
    finished: false,
    nextURL: "",
    nextTitle: "",
    nextQuestion: ""
  };

  handlePolling = () => {
    const { props } = this;
    const { session, sessionId } = props;
    let status = session.polling;

    let composite = { status, sessionId };

    props.setPolling(composite);
  };

  revealAnswer = () => {
    const { props } = this;
    const { session, sessionId } = props;
    let status = session.revealAnswer;

    let composite = { status, sessionId };

    props.revealAnswer(composite);
  };

  changeMode = () => {
    const { props } = this;
    const { session, sessionId } = props;
    let status = session.dark;

    let composite = { status, sessionId };

    props.changeMode(composite);
  };

  handleRepoll = () => {
    const { props } = this;
    const { sessionId } = props;

    props.rePoll(sessionId);
  };

  handlePrevious = () => {
    const { props } = this;
    const { sessionId, session, slices } = props;

    let id = session.sessionPlan[session.sliceNumber - 1];

    let nextComposite = { id, sessionId, slices };
    let updateComposite = { sessionId, slices };

    if (session.sliceNumber > 1) {
      props.prevSlice(sessionId);
      props.updateSession(updateComposite);
      props.getNextSlice(nextComposite);
    }
  };

  handleNext = (e) => {
    const { props } = this;
    const { sessionId, session, slices } = props;

    let id = session.sessionPlan[session.sliceNumber + 1];

    let nextComposite = { id, sessionId, slices };
    let updateComposite = { sessionId, slices };

    if (session.sliceNumber < session.sessionPlan.length) {
      props.nextSlice(sessionId);
      props.updateSession(updateComposite);
    }
    props.getNextSlice(nextComposite);
  };

  handleDifficulty = () => {
    const { props } = this;
    const { sessionId } = props;
    const { session } = props;

    let difficulty = session.difficulty;

    let composite = { difficulty, sessionId };

    props.changeDifficulty(composite);
  };

  handleTopic = () => {
    console.log("Topic Clicked");
  };

  handleHistogram = () => {
    const { props } = this;
    const { session, sessionId } = props;
    let status = session.displayGraph;

    let composite = { status, sessionId };

    props.displayGraph(composite);
  };

  Voted = (num) => {
    this.setState((state) => ({
      ...state,
      Voted: num
    }));
  };

  componentDidMount = () => {
    const { props } = this;
    const { session, sessionId, slices } = props;
    if (session) {
      let id = session.sessionPlan[session.sliceNumber];
      let composite = { id, sessionId, slices };

      props.getNextSlice(composite);
    }
  };

  render() {
    const { session, auth, profile, pie } = this.props;
    let state = this.state;

    if (!auth.uid) {
      return <Redirect to="/landing" />;
    }

    if (profile.userRole !== "admin" && profile.userRole !== "instructor") {
      return <Redirect to="/"></Redirect>;
    }
    var votePercent = 0;
    var classSize = 0;
    if (pie) {
      classSize = pie.studentId ? pie.studentId.length : 0;
      votePercent = (state.Voted / classSize) * 100;
      votePercent = isNaN(votePercent) && 0;
    }

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

    const correctClass = "collection-item black-text CorrectAnswer";
    const regClass = "collection-item black-text";

    return (
      <Container
        fluid
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
              title="Student View"
              style={{ height: "100%", position: "relative", textAlign: "center" }}
            >
              <div className="collection card-content" style={{ height: "100%", textAlign: "left", marginBottom: "7%" }}>
                <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                  {session.isCurrentSliceAQuestion ? session.slice.question : "No Current Question"}
                </h3>
                <a
                  id="answer1"
                  name="answer1"
                  href="#!"
                  className={
                    session.answer1 !== "" && session.answer1 === session.trueAnswer && session.revealAnswer && session.question !== ""
                      ? correctClass
                      : regClass
                  }
                >
                  {session && session.isCurrentSliceAQuestion ? "A: " + session.answer1 : "A:"}
                </a>
                <a
                  id="answer2"
                  name="answer2"
                  href="#!"
                  className={
                    session.answer2 !== "" && session.answer2 === session.trueAnswer && session.revealAnswer && session.question !== ""
                      ? correctClass
                      : regClass
                  }
                >
                  {session && session.isCurrentSliceAQuestion ? "B: " + session.answer2 : "B:"}
                </a>
                <a
                  id="answer3"
                  name="answer3"
                  href="#!"
                  className={
                    session.answer3 !== "" && session.answer3 === session.trueAnswer && session.revealAnswer && session.question !== ""
                      ? correctClass
                      : regClass
                  }
                >
                  {session && session.isCurrentSliceAQuestion ? "C: " + session.answer3 : "C:"}
                </a>
                <a
                  id="answer4"
                  name="answer4"
                  href="#!"
                  className={
                    session.answer4 !== "" && session.answer4 === session.trueAnswer && session.revealAnswer && session.question !== ""
                      ? correctClass
                      : regClass
                  }
                >
                  {session && session.isCurrentSliceAQuestion ? "D: " + session.answer4 : "D:"}
                </a>
              </div>
              {session.revealAnswer ? (
                <Button
                  style={{
                    bottom: "2px",
                    background: "grey"
                  }}
                  waves="light"
                  onClick={this.revealAnswer}
                >
                  Hide Correct Answer
                </Button>
              ) : (
                <Button
                  style={{
                    bottom: "2px",
                    background: "white",
                    color: "black"
                  }}
                  waves="dark"
                  onClick={this.revealAnswer}
                >
                  Show Correct Answer
                </Button>
              )}
            </Card>
          </Col>
          <Col md="4" style={{ paddingRight: "3em", height: "90%", marginTop: "2%" }}>
            <Row style={{ height: "50%", marginBottom: "1em" }}>
              <ProjectionTemplate
                slide="Current Slice"
                url={session.slice && session.slice.url}
                question={session.slice && session.slice.question}
                title={session.slice && session.slice.title}
                changeMode={this.changeMode}
                dark={session.dark}
              />
            </Row>
            <Row style={{ height: "50%", marginBottom: "-1em" }}>
              <ProjectionTemplate
                slide="Next Slice"
                url={session.nextSlice && session.nextSlice.url}
                question={session.nextSlice && session.nextSlice.question}
                title={session.nextSlice && session.nextSlice.title}
                changeMode={this.changeMode}
                dark={session.dark}
              />
            </Row>
          </Col>
          <Col md="4" style={{ paddingRight: "3em", height: "95%", marginTop: "2%" }}>
            <Row style={{ height: "50%" }}>
              <Histogram sid={this.props.sessionId} numResponded={this.Voted} />
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
                    <Card className="white darken-3" textClassName="black-text" style={{ fontSize: "1.5vw", height: "100%", margin: "0" }}>
                      <p style={{ textAlign: "center" }}>
                        {state.Voted}/{classSize}
                      </p>
                      <p style={{ textAlign: "center" }}>Voted {votePercent && votePercent.toFixed(2)} %</p>
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
                    {session && session.polling ? (
                      <Button waves="light" style={StyleOpen} onClick={this.handlePolling} id="PollingStatus">
                         <Stopwatch />
                      </Button>
                    ) : (
                      <Button waves="dark" style={StyleClosed} onClick={this.handlePolling} id="PollingStatus">
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
                    <Card className="grey darken-4 " textClassName="green-text" style={{ height: "100%", margin: "0" }}>
                      <Clock
                        format={"hh:mm:ss A"}
                        ticking
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
                      waves="light "
                      style={{
                        background: "grey",
                        width: "100%",
                        height: "100%",
                        fontSize: "1vw"
                      }}
                      onClick={this.handleRepoll}
                    >
                      Repoll Question
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
              width: "9%",
              height: "90%",
              padding: "2em",
              marginLeft: "4%",
              marginRight: ".1%"
            }}
            className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
            onClick={this.handlePrevious}
          >
            <Icon className="bigButt">skip_previous</Icon>
          </Button>

          <Button
            waves="light"
            style={{
              width: "9%",
              height: "90%",
              padding: "2em",
              marginRight: "1%"
            }}
            className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
            onClick={this.handleNext}
          >
            <Icon className="bigButt">skip_next</Icon>
          </Button>

          <Button
            waves="light"
            style={{
              width: "9%",
              height: "90%",
              padding: "2em",
              marginRight: ".1%"
            }}
            className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
            onClick={this.handleLecture}
          >
            Lecture Slice
          </Button>

          <Button
            waves="light"
            style={{
              width: "9%",
              height: "90%",
              padding: "2em",
              marginRight: "1%"
            }}
            className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
            onClick={this.handleQuestion}
          >
            Question Slice
          </Button>
          <Button
            waves="light"
            style={{
              width: "18%",
              height: "90%",
              padding: "2em",
              marginRight: "1%"
            }}
            className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
            onClick={this.handleDifficulty}
          >
            <b>Difficulty</b> {session ? session.difficulty : ""}
          </Button>

          <Button
            waves="light"
            style={{
              width: "18%",
              height: "90%",
              padding: "2em",
              marginRight: "1%"
            }}
            className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
            onClick={this.handleTopic}
          >
            <b>Topic</b> {session ? session.topic : ""}
          </Button>
          {session.displayGraph ? (
            <Button
              waves="light"
              style={{
                width: "18%",
                height: "90%",
                padding: "2em"
              }}
              className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
              onClick={this.handleHistogram}
            >
              <b>Hide Graph</b>
            </Button>
          ) : (
            <Button
              waves="light"
              style={{
                width: "18%",
                height: "90%",
                padding: "2em"
              }}
              className="btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light"
              onClick={this.handleHistogram}
            >
              <b>Show Graph</b>
            </Button>
          )}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { classes } = state.firestore.data;
  const { sessions, slices } = state.firestore.data;
  const session = sessions ? sessions[id] : null;
  const pie = classes ? classes[session.inClass] : null;

  return {
    pie: pie,
    sessionId: id,
    session: session,
    sessions: sessions,
    slices: slices,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = (dispatch) => ({
  nextSlice: (pie) => dispatch(nextSlice(pie)),
  prevSlice: (pie) => dispatch(prevSlice(pie)),
  setPolling: (pie) => dispatch(setPolling(pie)),
  revealAnswer: (pie) => dispatch(revealAnswer(pie)),
  rePoll: (pie) => dispatch(rePoll(pie)),
  changeDifficulty: (pie) => dispatch(changeDifficulty(pie)),
  updateSession: (pie) => dispatch(updateSession(pie)),
  displayGraph: (pie) => dispatch(displayGraph(pie)),
  getNextSlice: (pie) => dispatch(getNextSlice(pie)),
  changeMode: (pie) => dispatch(changeMode(pie))
});

const fbCompose = compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.session) {
      return [];
    } else {
      return ["slices", `sessions/${props.sessionId}`];
    }
  })
);

export default compose(connect(mapStateToProps, mapDispatchToProps), fbCompose)(Presentation);
