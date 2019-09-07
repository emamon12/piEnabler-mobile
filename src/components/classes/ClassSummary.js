import React from 'react'
import moment from 'moment'

const ClassSummary = ({ classs }) => {
    return (
        <div className="card z-depth-0 classs-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{classs.classIdentifier} - {classs.classsName}
                </span>
            </div>
        </div>
    )

}

export default ClassSummary