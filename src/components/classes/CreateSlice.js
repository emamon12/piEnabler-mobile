/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createSlice } from "../../store/actions/sliceActions";
import { Switch, Button } from "react-materialize";
import Textarea from "muicss/lib/react/textarea";
import Dropdown from "muicss/lib/react/dropdown";
import DropdownItem from "muicss/lib/react/dropdown-item";
import ImageUpload from "../util/ImageUpload";

class CreateSlice extends Component {
  state = {
    Lecture: false,
    Cheese: false,
    filename: "",
    url: "",
    Title: "",
    Topic: "",
    Answer1: "",
    Answer2: "",
    Answer3: "",
    Answer4: "",
    CorrectAnswer: "",
    Difficulty: ""
  };

  resetState = (e) => {
    this.setState((state) => ({
      ...state,
      filename: "",
      url: "",
      Title: "",
      Topic: "",
      Answer1: "",
      Answer2: "",
      Answer3: "",
      Answer4: "",
      CorrectAnswer: "",
      Difficulty: ""
    }));
  };

  handleChange = (e) => {
    const { target } = e;

    this.setState((state) => ({
      ...state,
      [target.id]: target.value
    }));
  };

  handleCheese = (e) => {
    e.preventDefault();
    console.log("cheese clicked");

    this.setState((state) => ({
      ...state,
      Cheese: !state.Cheese
    }));
  };
  handleImage = (filename, url) => {
    this.setState((state) => ({
      ...state,
      filename: filename,
      url: url
    }));

		const { props, state } = this;
		props.createSlice(state);
		props.history.push("/createSlice");
	};

  handleLectureChange = (e) => {
    const { target } = e;
    console.log(target.checked);
    console.log(target.id);

    this.setState((state) => ({
      ...state,
      [target.id]: target.checked
    }));
  };

  handleDifChange = (e, data) => {
    console.log(e);
    this.setState((state) => ({
      ...state,
      Difficulty: e
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { props, state } = this;
    props.createSlice(state);
    console.log("submit clicked");
    //the push acts as a redirect... when the form is submitted... redirect to home
    document.getElementById("form").reset();
    this.resetState();
    props.history.push("/createSlice");
  };



  render() {
    //just check if the user is authenticated
    const { auth, profile } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    if (profile.userRole !== "admin" && profile.userRole !== "instructor") {
      return <Redirect to="/"> </Redirect>;
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h2
            className="grey-text text-darken-3"
            style={{
              textAlign: "center"
            }}
          >
            Create A New Slice{" "}
          </h2>{" "}
          <div
            style={{
              position: "relative",
              paddingBottom: "3em"
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "1.5em",
                top: "1.75em"
              }}
            >
              <Switch offLabel="Question" onLabel="Lecture" onChange={this.handleLectureChange} id="Lecture" />
            </div>{" "}
            {this.state.Cheese ? (
              <Button
                waves="light"
                style={{
                  right: "1.5em",
                  position: "absolute",
                  backgroundColor: "#6a1b9a",
                  width: "6.5em"
                }}
                className="btn"
                onClick={this.handleCheese}
              >
                Slice{" "}
              </Button>
            ) : (
              <Button
                waves="light"
                style={{
                  right: "1.5em",
                  position: "absolute",
                  backgroundColor: "#6a1b9a",
                  width: "6.5em"
                }}
                className="btn"
                onClick={this.handleCheese}
              >
                Image{" "}
              </Button>
            )}{" "}
          </div>
          {this.state.Cheese ? (
            <div>
              <h4
                style={{
                  color: "red",
                  textAlign: "center"
                }}
              >
                WARNING IMAGES ARE UPLOADED IMMEDIATELY{" "}
              </h4>{" "}
              <div className="input-field">
                <label htmlFor="Topic"> Topic </label>{" "}
                <input type="text" name="Topic" id="Topic" className="input-style" autoComplete="off" onChange={this.handleChange} />{" "}
              </div>{" "}
              <ImageUpload uploadGoog={this.handleImage} />{" "}
            </div>
          ) : this.state.Lecture ? (
            <form
              style={{
                marginTop: 0
              }}
              className="white"
              id="form"
            >
              <div className="input-field">
                <label htmlFor="Title"> Slice Title </label>{" "}
                <input type="text" name="Title" id="Title" className="input-style" autoComplete="off" onChange={this.handleChange} />{" "}
              </div>{" "}
              <div className="input-field">
                <Textarea
                  type="text"
                  name="Question"
                  id="Question"
                  className="input-style class-message"
                  onChange={this.handleChange}
                  floatingLabel={true}
                  label="Lecture Material"
                  autoComplete="off"
                  required
                />
              </div>{" "}
              <div className="input-field">
                <label htmlFor="Topic"> Topic </label>{" "}
                <input type="text" name="Topic" id="Topic" className="input-style" onChange={this.handleChange} autoComplete="off" required />
              </div>{" "}
              <div
                className="input-field"
                style={{
                  paddingBottom: "2rem"
                }}
              >
                <Button type="submit" waves="light " className="btn purple-bg purple darken-3 right z-depth-1">
                  Create Slice{" "}
                </Button>{" "}
              </div>{" "}
            </form>
          ) : (
            <form
              style={{
                marginTop: 0
              }}
              className="white"
              id="form"
            >
              <div className="input-field">
                <label htmlFor="Title"> Slice Title </label>{" "}
                <input type="text" name="Title" id="Title" className="input-style" autoComplete="off" onChange={this.handleChange} />{" "}
              </div>{" "}
              <div className="input-field">
                <label htmlFor="Question"> Question </label>{" "}
                <input type="text" name="Question" id="Question" className="input-style" autoComplete="off" onChange={this.handleChange} required />
              </div>{" "}
              <div className="input-field">
                <label htmlFor="Answer1"> Answer 1 </label>{" "}
                <input type="text" name="Answer1" id="Answer1" className="input-style" autoComplete="off" onChange={this.handleChange} required />
              </div>{" "}
              <div className="input-field">
                <label htmlFor="Answer2"> Answer 2 </label>{" "}
                <input type="text" name="Answer2" id="Answer2" className="input-style" autoComplete="off" onChange={this.handleChange} required />
              </div>{" "}
              <div className="input-field">
                <label htmlFor="Answer3"> Answer 3 </label>{" "}
                <input type="text" name="Answer3" id="Answer3" className="input-style" autoComplete="off" onChange={this.handleChange} />{" "}
              </div>{" "}
              <div className="input-field">
                <label htmlFor="Answer4"> Answer 4 </label>{" "}
                <input type="text" name="Answer4" id="Answer4" className="input-style" autoComplete="off" onChange={this.handleChange} />{" "}
              </div>
              <div className="input-field">
                <label htmlFor="CorrectAnswer"> Correct Answer </label>{" "}
                <input
                  type="text"
                  name="CorrectAnswer"
                  id="CorrectAnswer"
                  className="input-style"
                  autoComplete="off"
                  onChange={this.handleChange}
                  required
                />
              </div>{" "}
              <div className="input-field">
                <label htmlFor="Topic"> Topic </label>{" "}
                <input type="text" name="Topic" id="Topic" className="input-style" autoComplete="off" onChange={this.handleChange} required />
              </div>{" "}
              <div className="input-field">
                <label
                  style={{
                    marginRight: "2em"
                  }}
                >
                  {" "}
                  Difficulty{" "}
                </label>
                <Dropdown
                  color="grey"
                  label={this.state.Difficulty ? this.state.Difficulty : ""}
                  id="Difficulty"
                  onSelect={this.handleDifChange}
                  style={{
                    marginLeft: "7em"
                  }}
                  required
                >
                  <DropdownItem value=""> None </DropdownItem> <DropdownItem value="easy"> Easy </DropdownItem>{" "}
                  <DropdownItem value="medium"> Medium </DropdownItem> <DropdownItem value="hard"> Hard </DropdownItem>{" "}
                </Dropdown>{" "}
              </div>
              <div
                className="input-field"
                style={{
                  paddingBottom: "2rem"
                }}
              >
                <Button type="submit" waves="light " className="btn purple-bg purple darken-3 right z-depth-1">
                  Create Slice{" "}
                </Button>{" "}
              </div>{" "}
            </form>
          )}{" "}
        </form>{" "}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

const mapDispatchToProps = (dispatch) => ({
  createSlice: (slices) => dispatch(createSlice(slices))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSlice);
