
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

    handleButtonClick = (e) => {
        e.preventDefault();

        var y = document.getElementsByClassName("collection-item black-text")

        console.log(e.target.value)

        y[0].className = "collection-item black-text disabled"
        y[1].className = "collection-item black-text disabled"
        y[2].className = "collection-item black-text disabled"
        y[3].className = "collection-item black-text disabled"
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
                    <div className="card">
                        <div className="card-content">
                            <label className="card-title black-text center">{session.question}</label>
                        </div>
                    </div>
                    <div className="collection card-content" onClick={this.handleListClick}>
                        <a id="answer1" name="answer1" href="#!" className="collection-item black-text" >{session.answer1}</a>
                        <a id="answer2" name="answer2" href="#!" className="collection-item black-text" >{session.answer2}</a>
                        <a id="answer3" name="answer3" href="#!" className="collection-item black-text" >{session.answer3}</a>
                        <a id="answer4" name="answer4" href="#!" className="collection-item black-text" >   {session.answer4}</a>
                    </div>
                    <div className="input-field center">
                        <button onClick={this.handleButtonClick} value={auth.uid} className="btn-large red-bg red darken-3 z-depth-1 waves-effect waves-light ">Submit</button>
                    </div>
                </div>
            )
        }
        else if (!session && isLoaded(session)) {
            return (
                <div className="container section">
                    <div className="card">
                        <div className="card-content grey-text text-darken-3 center">
                            <span className="card-title">Loading...</span>
                        </div>
                    </div>
                </div>
            )
        }

        else {
            return (
                <div className="container section">
                    <div className="card">
                        <div className="card-content grey-text text-darken-3 center">
                            <span className="card-title">Session Does Not Exist...</span>
                        </div>
                    </div>
                </div>
            )
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