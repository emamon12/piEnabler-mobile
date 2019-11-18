import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const Navbar = props => {
  const { auth, profile } = props;
  const links = auth.uid ? (
    <SignedInLinks profile={profile} auth={auth} />
  ) : (
    <SignedOutLinks />
  );

  const brandImage =
    "https://firebasestorage.googleapis.com/v0/b/piesiue.appspot.com/o/logo.png?alt=media&token=d9b38104-916b-492f-b128-dd00209cded9";

  return (
    <nav className="nav-wrapper purple-bg purple darken-3">
      <NavLink to="/">
        <div>
          <div style={{ position: "absolute", left: "1.3em" }}>
            <img src={brandImage} alt="Home" style={{ height: "2em" }} />
          </div>
          <div
            className="app-title"
            style={{ position: "absolute", left: "4.2em", top: ".5em" }}
          >
            piEnabler
          </div>
        </div>
      </NavLink>

      <div>{auth.isLoaded && links}</div>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default compose(firebaseConnect(), connect(mapStateToProps))(Navbar);
