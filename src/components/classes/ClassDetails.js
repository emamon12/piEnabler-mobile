import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-materialize'

const ClassDetails = (props) => {

    const { auth } = props;
    if (!auth.uid) {
        return <Redirect to='/signin/' />
    }

    const { classs } = props;

    if (classs && classs.currSession !== "") {
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
                    <div className="center">
                        <Link to={'/session/' + classs.currSession} key={classs.currSession}>
                            <button type="button" className="btn red-bg red darken-3 z-depth-1 waves-effect waves-light">Join Session</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    } else if (classs.currSession === "") {
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
                    <div className="center">
                        <Modal className="modal1"header="No Session Active" trigger={<button data-target="modal1" className="btn red-bg red darken-3 z-depth-1 waves-effect waves-light">Join Session</button>
                        }>
                            The class session is currently not active.
                    </Modal>
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
