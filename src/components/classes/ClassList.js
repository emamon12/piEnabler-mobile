import React from 'react';
import ClassSummary from './ClassSummary'
import { Link } from 'react-router-dom'

const ClassList = ({ classes, profile }) => {
    return (
        <div className="classs-list section">
            {classes && classes.map(classs => {

                var studentRegisteredClass = false;
                var studentIdArray = classs.studentId;
                var student;

                // eslint-disable-next-line no-lone-blocks
                //checks  the class studentId array to see if the userID is in there.
                for (student in studentIdArray) {
                    if (profile.uid === studentIdArray[student]) {
                        studentRegisteredClass = true;
                    }
                }
                // eslint-disable-next-line no-lone-blocks
                //if the student is registered in class, the class shows up in dashboard
                if (studentRegisteredClass) {
                    return (
                        <Link to={'/classes/' + classs.id} key={classs.id}>
                            <ClassSummary classs={classs} ></ClassSummary>
                        </Link>
                    )
                    // eslint-disable-next-line array-callback-return
                } else { return }

            })}
        </div>
    )
}

export default ClassList