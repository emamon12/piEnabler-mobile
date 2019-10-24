import React, { Component } from 'react'
import SessionPlanList from '../sessions/SessionPlanList'
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { createSession } from '../../store/actions/sessionActions'

class SessionPlans extends Component {
    state = {
        planningSession: false,
        sessionPlanSummary: "",
    };

    handleButtonClick = (e) => {
        this.setState(state => ({
            ...state,
            planningSession: true,
        }))
    };

    handleChange = (e) => {
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }))
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { props, state } = this;
        
        this.setState(state => ({
            ...state,
            planningSession: false,
        }))

        props.createSession(state);
    };

    render() {
        const { sessionplans, auth } = this.props;

        if (!auth.uid && isLoaded(auth)) {
            return <Redirect to='/signin' />
        }

        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col s12 m6">
                        <SessionPlanList sessionplans={sessionplans} profile={auth} />


                        {this.state.planningSession ?
                            <form className="white z-depth-1">
                                <div className="input-field center ease-in-anim card-content">
                                <label htmlFor="sessionPlanSummary">Provide A Quick Summary</label>
                                    <input
                                        type="text"
                                        name="sessionPlanSummary"
                                        id="sessionPlanSummary"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </form>
                            :
                            null}

                        <div className="input-field center">
                            {this.state.planningSession ?
                                <button
                                    type="submit"
                                    className="btn purple-bg purple ease-in-anim darken-3 z-depth-1"
                                    onClick={this.handleSubmit}>
                                    Submit New Session
                                </button>
                                :
                                <button
                                    type="submit"
                                    className="btn purple-bg purple ease-in-anim darken-3 z-depth-1"
                                    onClick={this.handleButtonClick}>
                                    Plan New Session
                                </button>}
                        </div>
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
        sessionplans: state.firestore.ordered.sessionplans,
        auth: state.firebase.auth,
        sessionErr: state.session.sliceError,
    }
}

const mapDispatchToProps = (dispatch) =>({
    createSession: sessionplans => dispatch(createSession(sessionplans))
});

//connect mapstatetoprops
//firestoreconnect connects the component to the firestore... so you can access the collections
export default compose(firestoreConnect([{ collection: 'sessionplans' }]), connect(mapStateToProps, mapDispatchToProps))(SessionPlans)

