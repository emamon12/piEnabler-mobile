import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./frickenlazorbeams.scss";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import { Card } from "react-materialize";
import Fullscreen from "react-full-screen";

class frickenlazorbeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ship: [0, 0],
      bullets: [],
      enabled: true,
      firing: true,
      isFull: false,
      slideNumber: 1
    };
  }
  componentDidMount() {
    // listen for shit
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("touchmove", this.handleMouseMove);
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);

    // run
    this.animate();
  }
  animate = now => {
    let drawVisual = requestAnimationFrame(this.animate);
    if (!this.state.last || now - this.state.last >= 1) {
      this.setState(state => ({
        ...state,
        last: now
      }))
      this.renderCanvas();
    }
  };

  handleMouseMove = event => {
    let _x = event.clientX || (event.touches ? event.touches[0].clientX : 0),
      _y = event.clientY || (event.touches ? event.touches[0].clientY : 0);

      this.setState(state => ({
        ...state,
      ship: [_x, _y]
    }))
  };

  handleKeyUp = event => {
    let _arr = ["Space"];
    


    if (_arr.includes(event.code)) {
      this.setState(state => ({
        ...state,
        enabled: !this.state.enabled
      }))
    }
  };

  handleKeyDown = event => {
    console.log(event.code);
  };

  handleBullet = (x, y) => {
    // drop the bass
    let _bullets = this.state.bullets;

    _bullets.push({ x: x, y: y });

    if (_bullets.length > 15) {
      _bullets.splice(0, _bullets.length - 15);
    } else {
      //_bullets.push({x : x, y : y});
    }
    this.setState(state => ({
      ...state,
      bullets: _bullets
    }))
  };

  renderBullets = () => {
    return this.state.bullets.map((bullet, index) => (
      <div
        className={"bullet"}
        style={{
          top: bullet.y + "px",
          left: bullet.x + "px"
        }}
      ></div>
    ));
  };

  renderShip = () => (
    <div
      id="ship"
      className={this.state.bullets ? "ship on" : "ship"}
      style={{
        top: this.state.ship[1] + "px",
        left: this.state.ship[0] + "px"
      }}
    ></div>
  );

  renderCanvas = () => {
    // MOVE SHIP
    let _dir = this.state.dir,
      _y = this.state.ship[1],
      _x = this.state.ship[0],
      _speed = this.state.speed;

    if (_y > window.innerHeight + 20) _y = -20;
    if (_y < -20) _y = window.innerHeight + 20;

    if (_x > window.innerWidth + 20) _x = -20;
    if (_x < -20) _x = window.innerWidth + 20;

    if (this.state.firing) this.handleBullet(_x, _y);

    this.setState({
      ship: [_x, _y]
    });
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
    if (authError){
      console.log(authError);
    }

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    let style = this.state.enabled ? "lazor" : "";

    return (
      <div className={style}>
        <div style={{ margin: "1em", padding: "0" }}>
          <Fullscreen enabled={this.state.isFull}>
            <Card
              className="white full-screenable-node"
              textClassName="black-text"
              style={{ height: "100%", position: "relative" }}
              onClick={this.nextSlide}
            >
              <h3 className="projection_title">Welcome to CS 140</h3>
              <div id="body" className="projection_body">
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
                  right: "1.5%"
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
                src="./../../darklogo.png"
                alt=""
                style={{ height: "1em" }}
              />
              <h3
                style={{
                  cursor: "default",
                  float: "right",
                  position: "absolute",
                  bottom: "2%",
                  left: "114.5%"
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

            {this.state.enabled ? this.renderShip() : null}
            {this.state.enabled ? this.renderBullets() : null}
          </Fullscreen>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { sessions } = state.firestore.data;
  const session = sessions ? sessions[id] : null;
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
)(frickenlazorbeams);
