import React, { Component } from 'react'
import ClassList from '../classes/ClassList'
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    render() {
        const { classes, auth } = this.props;

        if (!auth.uid && isLoaded(auth)) {
            return <Redirect to='/signin' />
        }

        return (
            <div className="dashboard">
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
    return {
        classes: state.firestore.ordered.classes,
        auth: state.firebase.auth
    }
}

//connect mapstatetoprops
//firestoreconnect connects the component to the firestore... so you can access the collections
export default compose(firestoreConnect([{ collection: 'classes', orderBy: ['classIdentifier', 'desc'] }]), connect(mapStateToProps))(Dashboard)

