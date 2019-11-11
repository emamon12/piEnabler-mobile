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
			type: "CHANGE_POLLING"
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
			type: "REPOLL"
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
			type: "NEXT_SLICE"
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
			type: "PREV_SLICE"
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
			type: "REVEAL_ANSWER"
		})
		.catch((err) => ({
			type: "REVEAL_ANSWER_ERROR",
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
			type: "DISPLAY_HISTOGRAM"
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
			type: "CHANGE_DIFFICULTY"
		})
		.catch((err) => ({
			type: "CHANGE_DIFFICULTY_ERROR",
			err
		}));
};

export const getNextSlice = (pie) => (dispatch, getState, { getFirestore }) => {
	// const { session } = pie.session;
	// let nextID = session.sessionPlan[session.sliceNumber + pie.value];
	// let nextUrl = "",
	// 	nextTitle = "",
	// 	nextQuestion = "";
	// if (nextID) {
	// 	getFirestore
	// 		.collection("slices")
	// 		.doc(nextID)
	// 		.get()
	// 		.then((docRef) => {
	// 			(nextUrl = docRef.data().url ? docRef.data().url : ""),
	// 				(nextTitle = docRef.data().url ? "" : docRef.data().Title),
	// 				(nextQuestion = docRef.data().url ? "" : docRef.data().Question);
	// 		});
	// }
	// dispatch({
	// 	type: "GET_NEXT_SLICE"
	// });
};

//I know this is ugly
export const updateSession = (pie) => (dispatch, getState, { getFirestore }) => {
	let fireStore = getFirestore();
	let sessionId = pie;

	console.log(sessionId);

	fireStore
		.collection("sessions")
		.doc(sessionId)
		.get()
		.then((docRef) => {
			console.log(docRef.data());
			let slice = docRef.data().sessionPlan;
			let index = docRef.data().sliceNumber - 1;
			if (slice[index]) {
				fireStore
					.collection("slices")
					.doc(slice[index])
					.get()
					.then((docRef2) => {
						if (docRef2.exists) {
							console.log(docRef2.data());
							fireStore
								.collection("sessions")
								.doc(sessionId)
								.update({
									answer1: docRef2.data().Answer1 ? docRef2.data().Answer1 : "",
									answer2: docRef2.data().Answer2 ? docRef2.data().Answer2 : "",
									answer3: docRef2.data().Answer3 ? docRef2.data().Answer3 : "",
									answer4: docRef2.data().Answer4 ? docRef2.data().Answer4 : "",
									respondA1: 0,
									respondA2: 0,
									respondA3: 0,
									respondA4: 0,
									revealAnswer: false,
									currentSliceId: slice[index],
									isCurrentSliceAQuestion: docRef2.data().Lecture ? false : true,
									numPolls: 1,
									polling: false,
									question: docRef2.data().Question ? docRef2.data().Question : "",
									topic: docRef2.data().Topic ? docRef2.data().Topic : "",
									difficulty: docRef2.data().Difficulty ? docRef2.data().Difficulty : "",
									sliceHistory: "",
									trueAnswer: docRef2.data().CorrectAnswer ? docRef2.data().CorrectAnswer : "",
									url: docRef2.data().url ? docRef2.data().url : "",
									filename: docRef2.data().filename ? docRef2.data().filename : ""
								})
								.then(() =>
									dispatch({
										type: "SUCCESSFULLY_UPDATED",
										sessionId
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
			} else {
				dispatch({
					type: "SLICE_EMPTY"
				});
			}
		});
};
