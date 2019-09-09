import React from 'react';
import ClassSummary from './ClassSummary'
import { Link } from 'react-router-dom'

const ClassList = ({ classes, profile }) => {
    return (
        <div className="classs-list section">
            {classes && classes.map(classs => {
                var y = false;

                var studentIdArray = classs.studentId;
                var i;

                for (i in studentIdArray) {
                    console.log(studentIdArray[i]);
                    if (profile.uid === studentIdArray[i]) {
                        y = true;
                    }
                }

                if (y) {
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