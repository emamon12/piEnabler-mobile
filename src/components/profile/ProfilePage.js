import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Row, Col, Preloader } from 'react-materialize'

class ProfilePage extends Component {

    render() {
        const { props } = this;
        const { user } = props;

        console.log(user);

        if (user) {
            return (
                <div className="container section">
                    <div className="card z-depth-0 section">
                        <div className="card-content row">
                            <img className="circle responsive-img col s4 l2 m4 xl2 offset-xl5 offset-s4 offset-l5 offset-m4" alt="" src="https://i.redd.it/6r7t2i5kgvu21.png">
                            </img>
                        </div>
                        <div className="row">
                            <div className="card-title center-align">
                                <p className="flow-text">{user.firstName} {user.lastName}</p>
                            </div>
                        </div>

                        <div className="card-content row">
                            <div className="card-title left-align">
                                <p className="profile-content flow-text">Role: {user.userRole}</p>
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

export default compose(connect(mapStateToProps), firestoreConnect(['users']))(ProfilePage);