import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import { Row, Col, Preloader } from "react-materialize";

class ProfilePage extends Component {
  render() {
    const { props } = this;
    const { user, auth } = props;

    const imgStyle = "circle responsive-img col s4 l2 m4 xl2 offset-xl5 offset-s4 offset-l5 offset-m4";

    if (user && auth) {
      if (!auth.uid) {
        return <Redirect to="/landing" />;
      }

      return (
        <div className="container section">
          <div className="card z-depth-0 section">
            <div className="row">
              <img className={imgStyle} alt={user.initials} src="https://i.redd.it/6r7t2i5kgvu21.png"></img>
            </div>
            <div className="row">
              <div className="card-title center-align">
                <p className="flow-text">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>

            <div className="card-content row">
              <div className="card-title left-align">
                <p className="profile-content flow-text">Current Registerd As: {user.userRole.toUpperCase()}</p>
                <br />
              </div>

              <p>Nothing To See Here Yet Folks!</p>
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

const mapStateToProps = (state) => {
  const { users } = state.firestore.data;
  const user = users ? users[state.firebase.auth.uid] : null;
  return {
    auth: state.firebase.auth,
    user: user
  };
};

const fbCompose = compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.auth) {
      return [];
    } else {
      return [`users/${props.auth.uid}`];
    }
  })
);

export default compose(connect(mapStateToProps), fbCompose)(ProfilePage);
