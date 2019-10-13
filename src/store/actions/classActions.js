
export const createClass = classs => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const { profile } = getState().firebase;
    const studentId = getState().firebase.auth.uid;

    fireStore.collection('classes').add({
        ...classs,
        teacherFirstName: profile.firstName,
        teacherLastName: profile.lastName,
        studentId: [studentId],
        messageOfTheDay: '',
        currSession: '',
        createdAt: new Date(),
    }).then(() => dispatch({
        type: 'CREATE_CLASS',
        classs,
    })).catch(err => dispatch({
        type: 'CREATE_ERROR',
        err,
    }));

};

export const addClass = classs => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const studentId = getState().firebase.auth.uid;

    var classId = classs.classKey;

    if (classId !== "") {
        fireStore.collection('classes').doc(classId).update({
            studentId: fireStore.FieldValue.arrayUnion(studentId),
        }).then(() => dispatch({
            type: 'ADD_CLASS',
            classs,
        })).catch((err) => dispatch({
            type: 'ADD_CLASS_ERROR',
            err,
        }))
    }
};

export const addResponse = (response, session) => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const studentId = getState().firebase.auth.uid;

    fireStore.collection('responses').doc(`${session.sessionId}${studentId}${session.currentSliceId}${session.numPolls}`).set({
        response: response.userAnswer,
        studentId: studentId,
        currSlice: session.currentSliceId,
        currSession: session.sessionId,
        timesPolled: session.numPolls

    }).then(() => dispatch({
        type: 'ADD_RESPONSE',
        response
    })).catch((err) => dispatch({
        type: 'ADD_RESPONSE_ERR',
        err
    }))

};