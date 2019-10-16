import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { signOut } from '../../store/actions/authActions';
import { Dropdown, Divider, SideNavItem, SideNav } from 'react-materialize';

const SignedInLinks = (props) => {
    // As in SignIn.jsx we need to use a function that gets as an argument firebase object

    const { profile } = props;

    const handleSignOut = () => {
        const { firebase } = props;
        props.signOut(firebase);
    };

    console.log(profile)

    if (profile.userRole === "instructor" || profile.userRole === "admin") {
        return (
            <div className="nav-container">
                <ul className="right">
                    <Dropdown trigger={<li className="navbar-dropdown" >Class Options</li>}>
                        <NavLink className="purple darken-3 white-text" to="/addClass">Add Class</NavLink>
                        <Divider></Divider>
                        <NavLink className="purple darken-3 white-text" to="/createClass">Create Class</NavLink>
                        <Divider></Divider>
                        <NavLink className="purple darken-3 white-text" to="/createSlice">Create Slice</NavLink>
                    </Dropdown>
                    <li><NavLink to="/addClass" className="navbar-attrib" >Add Class</NavLink></li>
                    <li><NavLink to="/createClass" className="navbar-attrib" >Create Class</NavLink></li>
                    <li><NavLink to="/createSlice" className="navbar-attrib" >Create Slice</NavLink></li>
                     {/* I left NavLink instead of anchor tag because I'm using airbnb eslint rules */}

                    <SideNav className="purple-bg purple darken-3 white-text" trigger={<li><button className="btn btn-floating grey-bg grey darken-3">{props.profile.initials}</button></li>} options={{ closeOnClick: true, edge: 'right' }}>
                        <SideNavItem userView user={{
                            background: "../img/background_img.png",
                            image: "../img/hat_kid.svg",
                            name: `${profile.firstName} ${profile.lastName}`,
                        }} />
                        <SideNavItem waves={true} icon="account_circle" to="/">
                            <span className="white-text">Profile</span>
                        </SideNavItem>
                        <Divider />
                        <SideNavItem waves={true} to="/" icon="settings_applications">
                        <span className="white-text">Settings</span>
                        </SideNavItem>
                        <Divider />
                        <SideNavItem waves={true} to="/" onClick={handleSignOut} icon="power_settings_new">
                        <span className="white-text">Log Out</span>
                        </SideNavItem>
                    </SideNav>
                </ul>
            </div>
        )
    } else if (profile.userRole === "student") {
        return (
            <div>
                <ul className="right">
                    <Dropdown trigger={<li className="navbar-dropdown" >Class Options</li>}>
                        <NavLink className="purple darken-3 white-text" to="/">Home</NavLink>
                        <Divider></Divider>
                        <NavLink className="purple darken-3 white-text" to="/addClass">Add Class</NavLink>
                    </Dropdown>
                    <li><NavLink to="/addClass" className="navbar-attrib">Add Class</NavLink></li>
                    {/* I left NavLink instead of anchor tag because I'm using airbnb eslint rules */}
                    <SideNav className="grey darken-3 white-text" trigger={<li><button className="btn btn-floating grey-bg grey darken-3">{props.profile.initials}</button></li>} options={{ closeOnClick: true, edge: 'right' }}>
                        <SideNavItem userView user={{
                            background: "../img/sidebar_background.jpg",
                            image: "../img/hat_kid.svg",
                            name: `${profile.firstName} ${profile.lastName}`,
                        }} />
                        <SideNavItem waves={true} className="white-text" to="/" icon="account_circle">Profile</SideNavItem>
                        <SideNavItem waves={true} className="white-text" to="/" icon="settings_applications">Settings</SideNavItem>
                        <SideNavItem waves={true} className="white-text" to="/" onClick={handleSignOut} icon="power_settings_new">Log Out</SideNavItem>
                    </SideNav>
                </ul>
            </div>

        )
    } else {
        return (
            <ul className="left">
            </ul>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    signOut: firebase => dispatch(signOut(firebase)),
});

export default compose(firebaseConnect(), connect(null, mapDispatchToProps))(SignedInLinks);