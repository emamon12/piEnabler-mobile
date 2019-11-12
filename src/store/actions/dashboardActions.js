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
	let { id, sessionId, slices } = pie;

	let nextUrl = "",
		nextTitle = "",
		nextQuestion = "";

	if (!sessionId || !slices) {
		return;
	}

	if (id) {
		let myslice = slices[id];

		let slice = {
			url: myslice.url ? myslice.url : "",
			title: myslice.url || !myslice.Title ? "" : myslice.Title,
			question: myslice.url || !myslice.Question ? "" : myslice.Question
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
			url: nextUrl,
			title: nextTitle,
			question: nextQuestion
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

//I know this is ugly
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
			console.log(docRef.data());

			let session = docRef.data();
			let sliceId = session.sessionPlan[session.sliceNumber - 1];
			console.log(sliceId)
			let myslice = slices[sliceId];
			let slice = {
				url: myslice.url ? myslice.url : "",
				title: myslice.url || !myslice.Title ? "" : myslice.Title,
				question: myslice.url || !myslice.Question ? "" : myslice.Question
			};

			console.log(slice);

			fireStore
				.collection("sessions")
				.doc(sessionId)
				.update({
					answer1: slice.Answer1 ? slice.Answer1 : "",
					answer2: slice.Answer2 ? slice.Answer2 : "",
					answer3: slice.Answer3 ? slice.Answer3 : "",
					answer4: slice.Answer4 ? slice.Answer4 : "",
					revealAnswer: false,
					currentSliceId: sliceId,
					isCurrentSliceAQuestion: slice.Lecture ? false : true,
					numPolls: 1,
					polling: false,
					topic: slice.Topic ? slice.Topic : "",
					difficulty: slice.Difficulty ? slice.Difficulty : "",
					sliceHistory: "",
					trueAnswer: slice.CorrectAnswer ? slice.CorrectAnswer : "",
					slice: slice
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
		});
		
};
