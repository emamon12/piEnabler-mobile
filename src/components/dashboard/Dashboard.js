import React, { Component } from "react";
import ClassList from "../classes/ClassList";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Row, Col, Preloader } from "react-materialize";

class Dashboard extends Component {
  render() {
    const { classes, auth, user } = this.props;

    if (!auth.uid && isLoaded(auth)) {
      return <Redirect to="/landing" />;
    }

    if (classes && user && user.registeredClasses) {
      return (
        <div className="dashboard">
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <ClassList user={user} classes={classes} />
            </div>
          </div>
        </div>
      );
    } else if (classes && user) {
      return (
        <div className="dashboard">
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="classs-list section">
                <div className="card z-depth-0 classs-summary">
                  <div className="card-content grey-text text-darken-3">
                    <span className="center-align card-title">
                      You Are Currently Not Registered To Any Classes!
                    </span>
                    <p className="center-align">
                      Click On The Add Class Button On The Navigation Bar To
                      Start Registering Classes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="section">
          <Row>
            <Col s={12} className="centerloader">
              <Preloader flashing size="big" />
            </Col>
          </Row>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  const { users } = state.firestore.data;
  const user = users ? users[state.firebase.auth.uid] : null;

  return {
    classes: state.firestore.ordered.classes,
    auth: state.firebase.auth,
    user: user
  };
};

const fbCompose = compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    console.log(props);
    if (!props) {
      return [];
    } else {
      return ["classes", `users/${props.auth.uid}`];
    }
  })
);

//connect mapstatetoprops
//firestoreconnect connects the component to the firestore... so you can access the collections
export default compose(fbCompose, connect(mapStateToProps))(Dashboard);
