
export const createSlice = slices => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const { profile } = getState().firebase;
    const teacherId = getState().firebase.auth.uid;

    fireStore.collection('slices').add({
        ...slices,
        teacherId: [teacherId],
        createdAt: new Date(),
    }).then(() => dispatch({
        type: 'CREATE_SLICE',
        slices,
    })).catch(err => dispatch({
        type: 'CREATE_ERROR',
        err,
    }));

};

export const addSlice = slices => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const teacherId = getState().firebase.auth.uid;

    var sliceID = slices.classKey;

    if (sliceID !== "") {
        fireStore.collection('slices').doc(sliceID).update({
            teacherId: fireStore.FieldValue.arrayUnion(teacherId),
        }).then(() => dispatch({
            type: 'ADD_SLICE',
            slices,
        })).catch((err) => dispatch({
            type: 'ADD_SLICE_ERROR',
            err,
        }))
    }
};

export const addResponse = sessions => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const teacherId = getState().firebase.auth.uid;

    var response = sessions.respose;
}