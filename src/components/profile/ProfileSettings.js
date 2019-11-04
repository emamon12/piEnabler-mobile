import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Row, Col, Preloader } from 'react-materialize'
import { Redirect } from 'react-router-dom'

class ProfileSettings extends Component {

    render() {
        const { props } = this;
        const { user, auth } = props;
        
        if (user) {
            return (
                <div className="container section">
                    <div className="card z-depth-0 section">
                        <div className="card-content row">
                            <div className="card-title center-align">
                                <p>Nothing To See Here Yet Folks!</p>
                            </div>
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
        auth: state.firebase.auth,
        user: user,
    };
};

export default compose(connect(mapStateToProps), firestoreConnect(['users']))(ProfileSettings);