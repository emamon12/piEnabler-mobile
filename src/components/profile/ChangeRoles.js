import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { changeRole } from "../../store/actions/adminActions";

class ChangeRoles extends Component {
  state = {
    userToChange: "",
    userRole: ""
  };

  handleChange = (e) => {
    const { target } = e;

    this.setState((state) => ({
      ...state,
      [target.id]: target.value.trim()
    }));
  };

  handleRadioChange = (e) => {
    const { target } = e;

    this.setState((state) => ({
      ...state,
      [target.name]: target.value
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { props, state } = this;

    const { userRole } = state;
    const { userToChange } = state;

    props.changeRole(userToChange, userRole);
  };

  render() {
    const { auth, profile, roleError } = this.props;
    if (!auth.uid) {
      return <Redirect to="/landing" />;
    }

    if (profile.userRole !== "admin") {
      return <Redirect to="/" />;
    }

    return (
      <div className="container section">
        <form onSubmit={this.handleSubmit} className="white">
          <h2 className="grey-text text-darken-3" style={{ textAlign: "center" }}>
            Change User Roles
          </h2>
          <div className="input-field">
            <label htmlFor="userToChange">Enter The Email Of The Desired User</label>
            <input type="text" name="userToChange" id="userToChange" onChange={this.handleChange} />
          </div>
          {/* <RadioGroup
                        name="userRole"
                        label="userRole"
                        withGap
                        onChange={this.handleRadioChange}
                        value={this.state.userRole}
                        options={[{ label: "Student", value: 'student' }, { label: 'Instructor', value: 'instructor' }, { label: 'Admin', value: 'admin' }]}
                    /> */}

          <label className="radio-element">
            <input className="with-gap" name="userRole" value="student" onClick={this.handleRadioChange} type="radio" />
            <span>Student</span>
          </label>

          <label className="radio-element">
            <input className="with-gap" name="userRole" value="instructor" onClick={this.handleRadioChange} type="radio" />
            <span>Instructor</span>
          </label>

          <label className="radio-element">
            <input className="with-gap" name="userRole" value="admin" onClick={this.handleRadioChange} type="radio" />
            <span>Admin</span>
          </label>

          <div className="input-field">
            <button type="submit" className="btn waves-effect waves-light purple-bg purple darken-3 z-depth-1">
              Change
            </button>
          </div>
          {roleError ? (
            <div className="red-text center text-darken-1">
              <p>{roleError}</p>
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  roleError: state.admin.roleErr
});

const mapDispatchToProps = (dispatch) => ({
  changeRole: (userToChange, userRole) => dispatch(changeRole(userToChange, userRole))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeRoles);
