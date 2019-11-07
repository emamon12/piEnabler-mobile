/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createClass } from "../../store/actions/classActions";
import { Checkbox } from "react-materialize";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

class CreateClass extends Component {
  state = {
    classsName: "",
    classSection: "",
    classIdentifier: "",
    classLecture: [],
    time: ['8:00', '9:15'],
  };

  handleChange = e => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { props, state } = this;
    state.classLecture += time[0] + '-' + time[1];
    delete state.time;
    props.createClass(state);
    //the push acts as a redirect... when the form is submitted... redirect to home
    props.history.push("/");
  };

  handleTime = time => this.setState({ time })

  render() {
    //just check if the user is authenticated
    const { auth, profile } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    if (profile.userRole !== "admin" && profile.userRole !== "instructor") {
      return <Redirect to="/"></Redirect>;
    }

    return (
      <div className="container section">
        <form onSubmit={this.handleSubmit} className="white">
          <h2 className="grey-text text-darken-3" style={{textAlign: "center"}}>Create new class</h2>
          <div className="input-field">
            <label htmlFor="classsName">Class Name</label>
            <input
              type="text"
              name="classsName"
              id="classsName"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="classsIdentifier">Class Identifier</label>
            <input
              type="text"
              name="classIdentifier"
              id="classIdentifier"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="classSection">Class Section</label>
            <input
              type="text"
              name="classSection"
              id="classSection"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="classLecture">Class Lecture</label>
            {/* <input
              type="text"
              name="classLecture"
              id="classLecture"
              onChange={this.handleChange}
            /> */}
            <Checkbox value="M" label="Monday" id="classLecture" onChange={this.handleDate} />
            <Checkbox value="T" label="Tuesday" id="classLecture" onChange={this.handleDate} />
            <Checkbox value="W" label="Wednesday" id="classLecture" onChange={this.handleDate} />
            <Checkbox value="R" label="Thursday" id="classLecture" onChange={this.handleDate} />
            <Checkbox value="F" label="Friday" id="classLecture" onChange={this.handleDate} />
            <TimeRangePicker id="classLecture" onChange={this.handleTime} value={this.state.time} />
          </div>
          <div className="input-field">
            <button
              type="submit"
              className="btn purple-bg purple darken-3 z-depth-1"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

const mapDispatchToProps = dispatch => ({
  createClass: classs => dispatch(createClass(classs))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateClass);
