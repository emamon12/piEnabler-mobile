import React from 'react'

const SessionPlanSummary = ({ sessionplans }) => {
    return (
        <div className="card z-depth-0 classs-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{sessionplans.sessionPlanSummary}
                </span>
                <span className="card-content">
                    Session Plan ID: {sessionplans.id}
                </span>
            </div>
        </div>
    )

}

export default SessionPlanSummary