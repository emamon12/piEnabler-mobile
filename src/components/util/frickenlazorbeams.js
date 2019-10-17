import React, { Component } from "react";
import "./frickenlazorbeams.scss";
import Projection from "../classes/Projection";

class frickenlazorbeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ship: [0, 0],
      bullets: [],
      enabled: true,
      firing: true
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
      this.setState({
        last: now
      });
      this.renderCanvas();
    }
  };

  handleMouseMove = event => {
    let _x = event.clientX || (event.touches ? event.touches[0].clientX : 0),
      _y = event.clientY || (event.touches ? event.touches[0].clientY : 0);

    this.setState({
      ship: [_x, _y]
    });
  };

  handleKeyUp = event => {
    let _arr = ["Space"];

    if (_arr.includes(event.code)) {
      this.setState({
        enabled: !this.state.enabled
      });
    }
  };

  handleKeyDown = event => {
    let _speed = this.state.speed,
      _dir = event.code;

    console.log(event.code);

    this.setState({
      dir: _dir,
      speed: _speed
    });
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
    this.setState({
      bullets: _bullets
    });
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
  render() {
    let style = this.state.enabled ? "lazor" : "";

    return (
      <div className={style}>
        <Projection />
        {this.state.enabled ? this.renderShip() : null}
        {this.state.enabled ? this.renderBullets() : null}
      </div>
    );
  }
}

export default frickenlazorbeams;
