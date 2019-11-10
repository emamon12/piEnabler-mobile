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
	let sessionId = pie.sessionId;

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
			numPolls: 0
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
			numPolls: 0
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

export const changeDifficulty = (pie) => (dispatch, getState, { getFirestore }) => {
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
			type: "CHANGE_DIFFICULTY"
		})
		.catch((err) => ({
			type: "CHANGE_DIFFICULTY_ERROR",
			err
		}));
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
			console.log(docRef.data())
			let slice = docRef.data().sessionPlan;
			let index = docRef.data().sliceNumber - 1;
			if (slice[index]) {
				fireStore
					.collection("slices")
					.doc(slice[index])
					.get()
					.then((docRef2) => {
						if (docRef2.exists) {
							console.log(docRef2.data())
							fireStore
								.collection("sessions")
								.doc(sessionId)
								.update({
									answer1: docRef2.data().Answer1,
									answer2: docRef2.data().Answer2,
									answer3: docRef2.data().Answer3,
									answer4: docRef2.data().Answer4,
									respondA1: 0,
									respondA2: 0,
									respondA3: 0,
									respondA4: 0,
									revealAnswer: false,
									currentSliceId: slice[index],
									isCurrentSliceAQuestion: docRef2.data().Lecture,
									numPolls: 1,
									polling: false,
									question: docRef2.data().Question,
									topic: docRef2.data().Topic,
									difficulty: docRef2.data().Difficulty,
									sliceHistory: "",
									trueAnswer: docRef2.data().CorrectAnswer,
									url: docRef2.data().url,
									filename: docRef2.data().filename
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
