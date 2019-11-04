import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { signOut } from "../../store/actions/authActions";
import { Dropdown, Divider, SideNavItem, SideNav } from "react-materialize";

const SignedInLinks = (props) => {
  // As in SignIn.jsx we need to use a function that gets as an argument firebase object

  const { profile, auth } = props

  const handleSignOut = () => {
    const { firebase } = props;
    props.signOut(firebase);
  }

  const textStyle = "purple darken-3 white-text"
  const buttonStyle = "btn btn-floating grey-bg grey darken-3"

  if (profile.userRole === "instructor" || profile.userRole === "admin") {
    return (
      <div className="nav-container">
        <ul className="right">
          <Dropdown
            trigger={<li className="navbar-dropdown">Class Options</li>}
          >
            <NavLink className={textStyle} to="/addClass">
              Add Class
            </NavLink>
            <Divider />
            <NavLink className={textStyle} to="/createClass">
              Create Class
            </NavLink>
            <Divider />
            <NavLink className={textStyle} to="/createSlice">
              Create Slice
            </NavLink>
            <Divider />
            <NavLink className={textStyle} to="/sessionplans">
              Session Plan
            </NavLink>
          </Dropdown>
          <li>
            <NavLink to="/addClass" className="navbar-attrib">
              Add Class
            </NavLink>
          </li>
          <li>
            <NavLink to="/createClass" className="navbar-attrib">
              Create Class
            </NavLink>
          </li>
          <li>
            <NavLink to="/createSlice" className="navbar-attrib">
              Create Slice
            </NavLink>
          </li>
          <li>
            <NavLink to="/sessionplans" className="navbar-attrib">
              Session Plan
            </NavLink>
          </li>

          <SideNav
            className="grey darken-3 white-text"
            trigger={
              <li>
                <button className={buttonStyle}>
                  {props.profile.initials}
                </button>
              </li>
            }
            options={{ closeOnClick: true, edge: "right" }}
          >
            <SideNavItem
              userView
              user={{
                background: "../img/sidebar_background.jpg",
                image: "../img/hat_kid.png",
                name: `${profile.firstName} ${profile.lastName}`
              }}
            />
            <SideNavItem
              waves={true}
              className="white-text"
              icon="account_circle"
              href={"../users/" + auth.uid}
            >
              Profile
            </SideNavItem>

            <SideNavItem
              waves={true}
              className="white-text"
              href={"../settings"}
              icon="settings_applications"
            >
              Settings
            </SideNavItem>
            <SideNavItem
              waves={true}
              className="white-text"
              onClick={handleSignOut}
              href=""
              icon="power_settings_new"
            >
              Log Out
            </SideNavItem>
          </SideNav>
        </ul>
      </div>
    );
  } else if (profile.userRole === "student") {
    return (
      <div className="nav-container">
        <ul className="right">
          <Dropdown
            trigger={<li className="navbar-dropdown">Class Options</li>}
          >
            <NavLink className={textStyle} to="/">
              Home
            </NavLink>
            <Divider></Divider>
            <NavLink className={textStyle} to="/addClass">
              Add Class
            </NavLink>
          </Dropdown>
          <li>
            <NavLink to="/addClass" className="navbar-attrib">
              Add Class
            </NavLink>
          </li>
          {/* I left NavLink instead of anchor tag because I'm using airbnb eslint rules */}
          <SideNav
            className="grey darken-3 white-text"
            trigger={
              <li>
                <button className={buttonStyle}>
                  {props.profile.initials}
                </button>
              </li>
            }
            options={{ closeOnClick: true, edge: "right" }}
          >
            <SideNavItem
              userView
              user={{
                background: "../img/sidebar_background.jpg",
                image: "../img/hat_kid.png",
                name: `${profile.firstName} ${profile.lastName}`
              }}
            />
            <SideNavItem
              waves={true}
              className="white-text"
              icon="account_circle"
              href={"../users/" + auth.uid}
            >
              Profile
            </SideNavItem>
            <SideNavItem
              waves={true}
              className="white-text"
              href={"../settings"}
              icon="settings_applications"
            >
              Settings
            </SideNavItem>
            <SideNavItem
              waves={true}
              className="white-text"
              onClick={handleSignOut}
              href=""
              icon="power_settings_new"
            >
              Log Out
            </SideNavItem>
          </SideNav>
        </ul>
      </div>
    );
  } else {
    return <ul className="left"></ul>;
  }
};

const mapDispatchToProps = dispatch => ({
  signOut: firebase => dispatch(signOut(firebase))
});

export default compose(
  firebaseConnect(),
  connect(
    null,
    mapDispatchToProps
  )
)(SignedInLinks);
