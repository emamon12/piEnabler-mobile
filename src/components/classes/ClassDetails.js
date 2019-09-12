import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const ClassDetails = (props) => {
    const { auth } = props;
    if (!auth.uid) {
        return <Redirect to='/signin/' />
    }

    const { classs } = props;

    if (classs) {
        return (
            <div>
                <div className="container section classs-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{classs.classIdentifier} - {classs.classSection} - {classs.classsName} - Message Of The Day</span>
                            <p>{classs.messageOfTheDay}</p>

                        </div>
                        <div className="card-action grey lighten-4 grey-text">
                            <div>Teacher: {classs.teacherFirstName} {classs.teacherLastName}</div>
                            <div>{classs.classLecture}</div>
                        </div>
                    </div>
                    <div className="center"> <button type="button" className="btn red-bg red darken-3 z-depth-1">Join Session</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>No Classes Currently Loaded...</p>
            </div>
        );
    };
}

//this basically just gets the classes objects from firestore and if there are classes to be shown, it maps it
const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { classes } = state.firestore.data;
    const classs = classes ? classes[id] : null
    return {
        classs: classs,
        auth: state.firebase.auth
    };
};


export default compose(connect(mapStateToProps), firestoreConnect(['classes']))(ClassDetails)
