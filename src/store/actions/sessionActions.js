export const createSession = (session) => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const profileId = getState().firebase.auth.uid;

    fireStore
        .collection("sessionplans")
        .add({
            ...session,
            createdBy: profileId,
            createdAt: new Date(),
            sliceIds: []
        })
        .then(() =>
            dispatch({
                type: "SUBMIT_PLAN",
                session
            })
        )
        .catch((err) =>
            dispatch({
                type: "SUBMIT_PLAN_ERROR",
                err
            })
        );
};

export const addSliceToSession = (session) => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    var sliceId = session.sliceId;
    var sessionplanid = session.sessionplanid;

    fireStore
        .collection("slices")
        .doc(sliceId)
        .get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                fireStore
                    .collection("sessionplans")
                    .doc(sessionplanid)
                    .update({
                        sliceIds: fireStore.FieldValue.arrayUnion(sliceId)
                    })
                    .then(() =>
                        dispatch({
                            type: "UNION_SLICE",
                            session
                        })
                    )
                    .catch((err) =>
                        dispatch({
                            type: "UNION_SLICE_ERROR",
                            err
                        })
                    );
            } else {
                dispatch({
                    type: "UNION_SLICE_NOT_EXIST"
                });
            }
        });
};

export const removeSliceFromSession = (session) => (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    const sliceToRemove = session.value;
    const sessionPlanId = session.sessionplanid;

    let sessionplan = fireStore.collection("sessionplans").doc(sessionPlanId);

    let getdoc = sessionplan
        .get()
        .then((docSnapshot) => {
            var sessionPlan = docSnapshot.data().sliceIds;

            var sliceIds = sessionPlan.filter(function(value, index, array) {
                return value !== sliceToRemove;
            });

            fireStore
                .collection("sessionplans")
                .doc(sessionPlanId)
                .update({
                    sliceIds: sliceIds
                })
                .then(() =>
                    dispatch({
                        type: "SUCCESSFULLY_DELETED",
                        session
                    })
                )
                .catch((err) =>
                    dispatch({
                        type: "UNSUCCESSFULLY_DELETED",
                        err
                    })
                );
        })
        .catch((err) =>
            dispatch({
                type: "UNABLE_TO_GET"
            })
        );

    if (getdoc) {
        console.log("removal complete");
    }
};
