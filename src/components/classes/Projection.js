import React from 'react'
import { Redirect } from "react-router-dom";


const Projection = ({  }) => {
    const { session, auth, authError } = this.props;
    console.log(authError)

    if (!auth.uid) {
        return <Redirect to="/signin" />;
    }
    return (
        <div className="card z-depth-0 classs-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title"> sessions.currentSliceID - slices.Question
                </span>
            </div>
        </div>
    )
}

export default Projection