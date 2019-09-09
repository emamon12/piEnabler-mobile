import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import { signIn } from '../../store/actions/authActions';

class SignIn extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { props, state } = this;
        const { firebase } = props;
        const credentials = { ...state };
        const authData = {
            firebase,
            credentials,
        };

        props.signIn(authData);
    }

    render() {
        const { auth, authError } = this.props;

        if (!isLoaded(auth)) {
            return (
                <p>loading</p>
            )
        }

        if (auth.uid) {
            return <Redirect to='/' />;
        }

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button type="submit" className="btn red-bg red darken-3 z-depth-1">Login</button>
                        {auth.isLoaded}
                        {authError ? <div className="red-text center text-darken-1"><p>{authError}</p></div> : null}
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authError: state.auth.authError,
    auth: state.firebase.auth
});

const mapDispatchToProps = dispatch => ({
    signIn: authData => dispatch(signIn(authData)),
});

export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps),
)(SignIn);

