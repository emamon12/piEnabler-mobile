export const setPolling = (pie) => (dispatch, getState, { getFirestore }) => {
    let fireStore = getFirestore();
    let sessionId = pie.sessionId;
    let status = !pie.status;

    fireStore
        .collection("sessions")
        .doc(sessionId)
        .update({
            polling: status
        })
        .then({
            type: "CHANGE_POLLING",
            id: sessionId
        })
        .catch((err) => ({
            type: "CHANGE_POLLING_ERROR",
            err
        }));
};

export const rePoll = (pie) => (dispatch, getState, { getFirestore }) => {
    let fireStore = getFirestore();
    let sessionId = pie;

    let increment = fireStore.FieldValue.increment(1);

    fireStore
        .collection("sessions")
        .doc(sessionId)
        .update({
            numPolls: increment
        })
        .then({
            type: "REPOLL",
            id: sessionId
        })
        .catch((err) => ({
            type: "REPOLL_ERROR",
            err
        }));
};

export const nextSlice = (pie) => (dispatch, getState, { getFirestore }) => {
    let fireStore = getFirestore();
    let sessionId = pie;

    let increment = fireStore.FieldValue.increment(1);

    fireStore
        .collection("sessions")
        .doc(sessionId)
        .update({
            sliceNumber: increment,
            numPolls: 0,
            revealAnswer: false
        })
        .then({
            type: "NEXT_SLICE",
            id: sessionId
        })
        .catch((err) => ({
            type: "NEXT_SLICE_ERROR",
            err
        }));
};

export const prevSlice = (pie) => (dispatch, getState, { getFirestore }) => {
    let fireStore = getFirestore();
    let sessionId = pie;

    let decrement = fireStore.FieldValue.increment(-1);

    fireStore
        .collection("sessions")
        .doc(sessionId)
        .update({
            sliceNumber: decrement,
            numPolls: 0,
            revealAnswer: false
        })
        .then({
            type: "PREV_SLICE",
            id: sessionId
        })
        .catch((err) => ({
            type: "PREV_SLICE_ERROR",
            err
        }));
};

export const revealAnswer = (pie) => (dispatch, getState, { getFirestore }) => {
    let fireStore = getFirestore();
    let sessionId = pie.sessionId;
    let status = !pie.status;

    fireStore
        .collection("sessions")
        .doc(sessionId)
        .update({
            revealAnswer: status
        })
        .then({
            type: "REVEAL_ANSWER",
            id: sessionId
        })
        .catch((err) => ({
            type: "REVEAL_ANSWER_ERROR",
            err
        }));
};

export const changeMode = (pie) => (dispatch, getState, { getFirestore }) => {
    let fireStore = getFirestore();
    let sessionId = pie.sessionId;
    let status = !pie.status;

    fireStore
        .collection("sessions")
        .doc(sessionId)
        .update({
            dark: status
        })
        .then({
            type: "MODE_CHANGED",
            id: sessionId
        })
        .catch((err) => ({
            type: "MODE_CHANGED_ERROR",
            err
        }));
};

export const displayGraph = (pie) => (dispatch, getState, { getFirestore }) => {
    let fireStore = getFirestore();
    let sessionId = pie.sessionId;
    let status = !pie.status;

    fireStore
        .collection("sessions")
        .doc(sessionId)
        .update({
            displayGraph: status
        })
        .then({
            type: "DISPLAY_HISTOGRAM",
            id: sessionId
        })
        .catch((err) => ({
            type: "DISPLAY_HISTOGRAM_ERROR",
            err
        }));
};

export const changeDifficulty = (pie) => (dispatch, getState, { getFirestore }) => {
    let fireStore = getFirestore();
    let sessionId = pie.sessionId;

    let value = pie.difficulty;

    switch (value) {
        case "easy":
            value = "medium";
            break;
        case "medium":
            value = "hard";
            break;
        default:
            value = "easy";
            break;
    }

    fireStore
        .collection("sessions")
        .doc(sessionId)
        .update({
            difficulty: value
        })
        .then({
            type: "CHANGE_DIFFICULTY",
            id: sessionId
        })
        .catch((err) => ({
            type: "CHANGE_DIFFICULTY_ERROR",
            err
        }));
};

export const getNextSlice = (pie) => (dispatch, getState, { getFirestore }) => {
    let { id, sessionId, slices } = pie;

    let nextUrl = "",
        nextTitle = "",
        nextQuestion = "";

    if (!sessionId || !slices) {
        return;
    }

    if (id) {
        let myslice = slices[id];
        if (myslice) {
            let slice = {
                url: myslice.url ? myslice.url : "",
                title: myslice.Title ? myslice.Title : "",
                question: myslice.Question ? myslice.Question : ""
            };
            getFirestore()
                .collection("sessions")
                .doc(sessionId)
                .update({
                    nextSlice: slice
                });
            dispatch({
                type: "GET_NEXT_SLICE",
                pie: slice
            });
        } else {
            let slice = {
                url: "",
                title: "",
                question: ""
            };
            getFirestore()
                .collection("sessions")
                .doc(sessionId)
                .update({
                    nextSlice: slice
                });
            dispatch({
                type: "GET_NEXT_SLICE",
                pie: slice
            });
        }
    } else {
        let slice = {
            url: "",
            title: "",
            question: ""
        };
        getFirestore()
            .collection("sessions")
            .doc(sessionId)
            .update({
                nextSlice: slice
            });
        dispatch({
            type: "GET_NEXT_SLICE",
            pie: slice
        });
    }
};

export const updateSession = (pie) => (dispatch, getState, { getFirestore }) => {
    let fireStore = getFirestore();
    let { sessionId, slices } = pie;

    console.log(sessionId);

    if (!sessionId || !slices) {
        return;
    }
    fireStore
        .collection("sessions")
        .doc(sessionId)
        .get()
        .then((docRef) => {
            let session = docRef.data();
            let sliceId = session.sessionPlan[session.sliceNumber - 1];
            let myslice = slices[sliceId];
            if (myslice) {
                let slice = {
                    url: myslice.url ? myslice.url : "",
                    title: myslice.Title ? myslice.Title : "",
                    question: myslice.Question ? myslice.Question : ""
                };

                fireStore
                    .collection("sessions")
                    .doc(sessionId)
                    .update({
                        answer1: myslice.Answer1 ? myslice.Answer1 : "",
                        answer2: myslice.Answer2 ? myslice.Answer2 : "",
                        answer3: myslice.Answer3 ? myslice.Answer3 : "",
                        answer4: myslice.Answer4 ? myslice.Answer4 : "",
                        QuesionURL: myslice.QuestionURL ? myslice.QuesionURL : "",
                        revealAnswer: false,
                        currentSliceId: sliceId,
                        isCurrentSliceAQuestion: myslice.Lecture ? false : true,
                        numPolls: 1,
                        polling: false,
                        topic: myslice.Topic ? myslice.Topic : "",
                        difficulty: myslice.Difficulty ? myslice.Difficulty : "",
                        sliceHistory: session.sliceNumber - 2 >= 0 && fireStore.FieldValue.arrayUnion(session.sessionPlan[session.sliceNumber - 2]),
                        trueAnswer: myslice.CorrectAnswer ? myslice.CorrectAnswer : "",
                        slice: slice
                    })
                    .then(() =>
                        dispatch({
                            type: "SUCCESSFULLY_UPDATED",
                            id: sessionId
                        })
                    )
                    .catch((err) =>
                        dispatch({
                            type: "UNSUCCESSFULLY_UPDATED",
                            err
                        })
                    );
            }
        });
};
