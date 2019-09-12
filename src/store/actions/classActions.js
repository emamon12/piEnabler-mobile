
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
    var ref = fireStore.collection('classes').doc(classId);

    ref.update({
        studentId: fireStore.FieldValue.arrayUnion(studentId),
    }).then(() => dispatch({
        type: 'ADD_CLASS',
        classs,
    })).catch((err) => dispatch({
        type: 'ADD_CLASS_ERROR',
        err,
    }))
};