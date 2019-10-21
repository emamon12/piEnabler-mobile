export const createSession = session => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const { profile } = getState().firebase;
    const profileId = getState().firebase.auth.uid;

    fireStore.collection("sessionplans").add({
        ...session,
        createdBy: profileId,
        createdAt: new Date(),
        sliceIds: [],
    }).then(() => dispatch({
        type: 'SUBMIT_PLAN',
        session,
    })).catch((err) => dispatch({
        type: 'SUBMIT_PLAN_ERROR',
        err,
    }));
};

export const addSliceToSession = session => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    var sliceId = session.sliceId;
    var sessionplanid = session.sessionplanid;

    fireStore.collection('slices').doc(sliceId).get()
        .then(docSnapshot => {
            if (docSnapshot.exists) {
                fireStore.collection('sessionplans').doc(sessionplanid).update({
                    sliceIds: fireStore.FieldValue.arrayUnion(sliceId),
                }).then(() => dispatch({
                    type: "UNION_SLICE",
                    session,
                })).catch((err) => dispatch({
                    type: "UNION_SLICE_ERROR",
                    err
                }))
            } else{
                dispatch({
                    type: "UNION_SLICE_NOT_EXIST"
                })
            }
        })

};