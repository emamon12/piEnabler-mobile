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

export const addResponse = fbase => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const studentId = getState().firebase.auth.uid;
    const session = fbase.session;
    const resp = fbase.uAnswer;

    fireStore.collection('responses').doc(`${session.sessionId}${studentId}${session.currentSliceId}${session.numPolls}`).set({
        response: resp.userAnswer,
        studentId: studentId,
        currSlice: session.currentSliceId,
        currSession: session.sessionId,
        timesPolled: session.numPolls

    }).then(() => dispatch({
        type: 'ADD_RESPONSE'
    })).catch((err) => dispatch({
        type: 'ADD_RESPONSE_ERR',
        err
    }))

};

export const ChangeMessage = classs => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const message = classs.value;
    const collection = classs.classId;

    fireStore.collection('classes').doc(collection).update({
        messageOfTheDay: message,
    }).then(() => ({
        type: 'CHANGE_MESSAGE'
    })).catch((err) => dispatch({
        type: 'CHANGE_MESSAGE_ERROR',
        err
    }))
};

export const RemoveSession = classs => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const collection = classs;

    console.log(collection);

    fireStore.collection('classes').doc(collection).update({
        currSession: "",
    }).then(() => ({
        type: 'SUCCESSFULLY_ENDED',
    })).catch((err) => dispatch({
        type: 'UNSUCCESSFULLY_ENDED',
        err
    }))
};