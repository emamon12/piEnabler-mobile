import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = (props) => {
  const { auth, profile } = props;
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

  return (
    <nav className="nav-wrapper purple-bg purple darken-3">
      <ul className="left">
        <li><NavLink to="/" className="">
          <img src="logo.png" alt="Home" style={{ height: "2em" }} />
        </NavLink>
        </li>
        <li><h3 className="app-title" style={{ cursor: "default" }}>piEnabler</h3></li>
      </ul>
      <div>
        {auth.isLoaded && links}
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(Navbar);