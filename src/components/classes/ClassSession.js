
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'

class ClassSession extends Component {
    state = {
        userAnswer: ""
    }

    handleListClick = (e) => {
        e.preventDefault();
        var x = document.getElementsByClassName("collection-item black-text")

        x[0].className = "collection-item black-text"
        x[1].className = "collection-item black-text"
        x[2].className = "collection-item black-text"
        x[3].className = "collection-item black-text"

        this.setState({
            userAnswer: e.target.name
        })



        e.target.className = "collection-item black-text red lighten-3"
    }

    render() {
        //this just redirects if the user is not authenticated
        const { session, auth } = this.props;

        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }
        //this is whats actually being seen in the ClassList
        if (session) {
            return (
                <div className="container section">
                    <div className="collection card-content" onClick={this.handleListClick}>
                        <a id="answer1" name="answer1" href="#!" className="collection-item black-text" >{session.answer1}</a>
                        <a id="answer2" name="answer2" href="#!" className="collection-item black-text" >{session.answer2}</a>
                        <a id="answer3" name="answer3" href="#!" className="collection-item black-text" >{session.answer3}</a>
                        <a id="answer4" name="answer4" href="#!" className="collection-item black-text" >{session.answer4}</a>
                    </div>
                </div>

            );
        } else if (!session) {
            return (
                <div className="container section">
                    <div className="card">
                        <div className="card-content grey-text text-darken-3 center">
                            <span className="card-title">No Session Active</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card z-depth-0 container section center">
                    <div className="card-content grey-text text-darken-3 center">
                        <span className="card-title">Loading...</span>
                    </div>
                </div>
            );
        }

    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { sessions } = state.firestore.data;
    const session = sessions ? sessions[id] : null
    return {
        session: session,
        auth: state.firebase.auth
    };
};

export default compose(connect(mapStateToProps), firestoreConnect(['sessions']))(ClassSession);