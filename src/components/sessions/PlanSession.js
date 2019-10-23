/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { addSliceToSession } from '../../store/actions/sessionActions'

class PlanSession extends Component {
    state = {
        sliceId: '',
    };

    handleChange = e => {
        const { target } = e;
    
        this.setState(state => ({
          ...state,
          [target.id]: target.value
        }));
      };

    handleSubmit = (e) => {
        e.preventDefault();
        const { props, state } = this;

        const sliceId = state.sliceId;

        const sessionplanid = props.sessionplansid;

        const composite = { sessionplanid, sliceId }

        props.addSliceToSession(composite);
    };

    render() {
        //just check if the user is authenticated
        const { props } = this;
        const { auth, user, sessionplansid, sessionplans } = props;

        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }

        if (user && user.userRole === "student") {
            return <Redirect to="/" />
        }

        return (
            <div className="container section">
                <form onSubmit={this.handleSubmit} className="white">
                    <h2 className="grey-text text-darken-3">Session Planner</h2>
                    <h5 className="grey-text text-darken-3">Planner Id: {sessionplansid}</h5>
                    {sessionplans.sliceIds && sessionplans.sliceIds.map(slices => {
                        return (
                            <h5 key={slices}>{slices}</h5>
                        )
                    })
                    }
                    <div className="input-field">
                        <label htmlFor="sliceId">Input Slice Id to Add</label>
                        <input
                            type="text"
                            name="sliceId"
                            id="sliceId"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <button
                            type="submit"
                            className="btn purple-bg purple darken-3 z-depth-1">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { sessionplans } = state.firestore.data;
    const { users } = state.firestore.data;
    const sessionplan = sessionplans ? sessionplans[id] : null
    const user = users ? users[state.firebase.auth.uid] : null
    return {
        sessionplans: sessionplan,
        auth: state.firebase.auth,
        user: user,
        sessionplansid: id
    };
};
const mapDispatchToProps = dispatch => ({
    addSliceToSession: session => dispatch(addSliceToSession(session))
});

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(['users', 'sessionplans']))(PlanSession);