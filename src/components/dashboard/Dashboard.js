import React, { Component } from 'react'
import ClassList from '../classes/ClassList'
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Row, Col, Preloader } from 'react-materialize'


class Dashboard extends Component {
    render() {
        const { classes, auth, user } = this.props;

        if (!auth.uid && isLoaded(auth)) {
            return <Redirect to='/signin' />
        }

        if (classes && user) {
            return (
                <div className="dashboard">
                    <div className="row">
                        <div className="col s12 m6" style={{marginLeft: "1%"}}>
                            <ClassList user={user} classes={classes} />
                        </div>
                        <div className="col s12 m5 offset-m1">
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="section">
                    <Row>
                        <Col s={12} className="centerloader">
                            <Preloader flashing size="big" />
                        </Col>
                    </Row>
                </div>
            )
        }
    }

}

const mapStateToProps = (state) => {
    const { users } = state.firestore.data;
    const user = users ? users[state.firebase.auth.uid] : null

    return {
        classes: state.firestore.ordered.classes,
        auth: state.firebase.auth,
        user: user,
    }
}

//connect mapstatetoprops
//firestoreconnect connects the component to the firestore... so you can access the collections
export default compose(firestoreConnect([{ collection: 'classes' }, 'users']), connect(mapStateToProps))(Dashboard)

