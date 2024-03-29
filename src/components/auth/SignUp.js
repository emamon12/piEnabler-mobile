import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/actions/authActions";

export class SignUp extends Component {
    state = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        userRole: "student"
    };

    handleChange = (e) => {
        const { target } = e;

        this.setState((state) => ({
            ...state,
            [target.id]: target.value
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { props, state } = this;
        const { firebase } = props;
        const newUser = { ...state };

        props.signUp(newUser, firebase);
    };

    render() {
        const { auth, signUpError } = this.props;

        if (auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h2 className="grey-text text-darken-3" style={{ textAlign: "center" }}>
                        Sign Up
                    </h2>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn purple-bg purple darken-3 z-depth-1">Sign Up</button>
                        {signUpError ? (
                            <div className="red-text center text-darken-1">
                                <p>{signUpError}</p>
                            </div>
                        ) : null}
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    signUpError: state.auth.signUpError
});

const mapDispatchToProps = (dispatch) => ({
    signUp: (newUser, firebase) => dispatch(signUp(newUser, firebase))
});

export default compose(firebaseConnect(), connect(mapStateToProps, mapDispatchToProps))(SignUp);
