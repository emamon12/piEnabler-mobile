import React, { Component } from 'react'
import Notifications from './Notifications.js'
import ClassList from '../classes/ClassList'
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    render() {
        const { classes, auth } = this.props;

        console.log(auth);

        if (!auth.uid && isLoaded(auth)) {
            return <Redirect to='/signin' />
        }

        return (
            <div className="dashboard continaer">
                <div className="row">
                    <div className="col s12 m6">
                        <ClassList classes={classes} profile={auth} />

                    </div>

                    <div className="col s12 m5 offset-m1">
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        classes: state.firestore.ordered.classes,
        auth: state.firebase.auth
    }
}

export default compose(firestoreConnect([{ collection: 'classes', orderBy: ['classIdentifier', 'desc']}]), connect(mapStateToProps))(Dashboard)