import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Row, Col, Preloader } from "react-materialize";
import { signIn } from "../../store/actions/authActions";

class SignIn extends Component {
    state = {
        email: "",
        password: ""
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

        // As we use react-redux-firebas-v3 we need to pass firebase object to
        // authActions to be authorized by using firebse.auth method
        const { props, state } = this;
        const { firebase } = props;
        const credentials = { ...state };
        const authData = {
            firebase,
            credentials
        };

        props.signIn(authData);
    };

    render() {
        const { auth, authError } = this.props;

        if (!isLoaded(auth)) {
            return (
                <div>
                    <Row>
                        <Col s={12}>
                            <Preloader flashing size="big" />
                        </Col>
                    </Row>
                </div>
            );
        }

        if (auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h2 className="grey-text text-darken-3" style={{ textAlign: "center" }}>
                        Login
                    </h2>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button type="submit" className="btn purple-bg purple darken-3 z-depth-1">
                            Login
                        </button>
                        {authError ? (
                            <div className="red-text center text-darken-1">
                                <p>{authError}</p>
                            </div>
                        ) : null}
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authError: state.auth.authError,
    auth: state.firebase.auth
});

const mapDispatchToProps = (dispatch) => ({
    signIn: (authData) => dispatch(signIn(authData))
});

// We need firebaseConnect function to provide to this component
// firebase object with auth method.
// You can find more information on the link below
// http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html
export default compose(firebaseConnect(), connect(mapStateToProps, mapDispatchToProps))(SignIn);
