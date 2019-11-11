export const createClass = (classs) => (dispatch, getState, { getFirestore }) => {
	const fireStore = getFirestore();
	const { profile } = getState().firebase;
	const id = getState().firebase.auth.uid;

	fireStore
		.collection("classes")
		.add({
			...classs,
			teacherFirstName: profile.firstName,
			teacherLastName: profile.lastName,
			messageOfTheDay: "",
			currSession: "",
			createdAt: new Date()
		})
		.then((docRef) => {
			fireStore
				.collection("users")
				.doc(id)
				.update({
					registeredClasses: fireStore.FieldValue.arrayUnion(docRef.id)
				})
				.then(() =>
					dispatch({
						type: "CREATE_CLASS",
						classs
					})
				)
				.catch((err) =>
					dispatch({
						type: "CREATE_ERROR",
						err
					})
				);
		})
		.catch((err) =>
			dispatch({
				type: "CREATE_ERROR",
				err
			})
		);
};

export const addClass = (classs) => (dispatch, getState, { getFirestore }) => {
	const fireStore = getFirestore();
	const studentId = getState().firebase.auth.uid;

	var classId = classs.classKey;

	if (classId) {
		fireStore
			.collection("classes")
			.doc(classId)
			.get()
			.then((docRef) => {
				if (docRef.exists) {
					fireStore
						.collection("users")
						.doc(studentId)
						.update({
							registeredClasses: fireStore.FieldValue.arrayUnion(classId)
						})
						.then(() =>
							dispatch({
								type: "ADD_CLASS",
								classs
							})
						)
						.catch((err) =>
							dispatch({
								type: "ADD_CLASS_ERROR",
								err
							})
						);
				} else {
					dispatch({
						type: "ADD_CLASS_ERROR"
					});
				}
			});
	} else {
		dispatch({
			type: "ADD_CLASS_BLANK"
		});
	}
};

export const addResponse = (fbase) => (dispatch, getState, { getFirestore }) => {
	const fireStore = getFirestore();
	const studentId = getState().firebase.auth.uid;
	const session = fbase.session;
	const sessionid = fbase.sessionid;
	const resp = fbase.uAnswer;

	if (resp.userAnswer === "answer1" || resp.userAnswer === "answer2" || resp.userAnswer === "answer3" || resp.userAnswer === "answer4") {
		fireStore
			.collection("responses")
			.doc(`${sessionid}${studentId}${session.currentSliceId}${session.numPolls}`)
			.set({
				response: resp.userAnswer,
				studentId: studentId,
				forSlice: session.currentSliceId,
				forSession: sessionid,
				timesPolled: session.numPolls,
				responseReference: `${sessionid}${session.currentSliceId}${session.numPolls}`
			})
			.then(
				fireStore
					.collection("/sessions/" + sessionid + "/responses/")
					.doc(`${sessionid}${studentId}${session.currentSliceId}${session.numPolls}`)
					.set({
						response: resp.userAnswer,
						studentId: studentId,
						forSlice: session.currentSliceId,
						forSession: sessionid,
						timesPolled: session.numPolls,
						responseReference: `${sessionid}${session.currentSliceId}${session.numPolls}`
					})
					.then(() => ({
						type: "ADD_RESPONSE"
					}))
					.catch((err) =>
						dispatch({
							type: "ADD_RESPONSE_ERR",
							err
						})
					)
			)
			.catch((err) =>
				dispatch({
					type: "ADD_RESPONSE_ERR",
					err
				})
			);
	} else {
		console.log("invalid answer");
	}
};

export const ChangeMessage = (classs) => (dispatch, getState, { getFirestore }) => {
	const fireStore = getFirestore();
	const message = classs.value;
	const collection = classs.classId;

	fireStore
		.collection("classes")
		.doc(collection)
		.update({
			messageOfTheDay: message
		})
		.then(() => ({
			type: "CHANGE_MESSAGE"
		}))
		.catch((err) =>
			dispatch({
				type: "CHANGE_MESSAGE_ERROR",
				err
			})
		);
};

export const RemoveSession = (classs) => (dispatch, getState, { getFirestore }) => {
	const fireStore = getFirestore();
	const classCollection = classs.classId;
	const sessionId = classs.sessionId;

	fireStore
		.collection("sessions")
		.doc(sessionId)
		.update({
			sessionEnd: new Date(),
			inClass: "",
			currentSliceId: ""
		})
		.then(
			fireStore
				.collection("classes")
				.doc(classCollection)
				.update({
					currSession: ""
				})
				.then(() => ({
					type: "SUCCESSFULLY_ENDED"
				}))
				.catch((err) =>
					dispatch({
						type: "UNSUCCESSFULLY_ENDED",
						err
					})
				)
		)
		.catch((err) => ({
			type: "UNSUCCESSFULLY_ENDED",
			err
		}));
};

export const LoadSession = (classs) => (dispatch, getState, { getFirestore }) => {
	const fireStore = getFirestore();
	const collection = classs.classId;
	const sessionToLoad = classs.sessionToLoad;

	if (sessionToLoad) {
		fireStore
			.collection("sessionplans")
			.doc(sessionToLoad)
			.get()
			.then((docRef) => {
				if (docRef.exists) {
					var sliceIds = docRef.data().sliceIds;
					if (sliceIds[0]) {
						fireStore
							.collection("slices")
							.doc(sliceIds[0])
							.get()
							.then((docRef2) => {
								if (docRef2.exists && docRef2.data().Cheese && docRef2.data().Cheese === true) {
									fireStore
										.collection("sessions")
										.add({
											answer1: "",
											answer2: "",
											answer3: "",
											answer4: "",
											respondA1: 0,
											respondA2: 0,
											respondA3: 0,
											respondA4: 0,
											revealAnswer: false,
											displayGraph: false,
											currentSliceId: sliceIds[0],
											inClass: collection,
											isCurrentSliceAQuestion: docRef2.data().Lecture ? !docRef2.date().Lecture : "",
											numPolls: 1,
											polling: false,
											question: "",
											topic: docRef2.data().Topic,
											difficulty: "",
											sessionPlan: sliceIds,
											sessionStart: new Date(),
											sessionEnd: "",
											sliceHistory: "",
											trueAnswer: "",
											sliceNumber: 1,
											url: docRef2.data().url,
											filename: docRef2.data().filename
										})
										.then((docRefSession) => {
											fireStore
												.collection("classes")
												.doc(collection)
												.update({
													currSession: docRefSession.id
												})
												.then(() =>
													dispatch({
														type: "SUCCESSFULLY_LOADED",
														classs
													})
												)
												.catch((err) =>
													dispatch({
														type: "UNSUCCESSFULLY_LOADED",
														err
													})
												);
										});
								} else {
									if (docRef2.exists && docRef2.data().Lecture === false) {
										fireStore
											.collection("sessions")
											.add({
												answer1: docRef2.data().Answer1,
												answer2: docRef2.data().Answer2,
												answer3: docRef2.data().Answer3,
												answer4: docRef2.data().Answer4,
												respondA1: 15,
												respondA2: 15,
												respondA3: 45,
												respondA4: 25,
												revealAnswer: false,
												displayGraph: false,
												title: docRef2.data().Title,
												currentSliceId: sliceIds[0],
												inClass: collection,
												isCurrentSliceAQuestion: !docRef2.data().Lecture,
												numPolls: 1,
												polling: false,
												question: docRef2.data().Question,
												topic: docRef2.data().Topic,
												difficulty: docRef2.data().Difficulty,
												sessionPlan: sliceIds,
												sessionStart: new Date(),
												sessionEnd: "",
												sliceHistory: "",
												trueAnswer: docRef2.data().CorrectAnswer,
												sliceNumber: 1,
												url: "",
												filename: ""
											})
											.then((docRefSession) => {
												fireStore
													.collection("classes")
													.doc(collection)
													.update({
														currSession: docRefSession.id
													})
													.then(() =>
														dispatch({
															type: "SUCCESSFULLY_LOADED",
															classs
														})
													)
													.catch((err) =>
														dispatch({
															type: "UNSUCCESSFULLY_LOADED",
															err
														})
													);
											});
									} else if (docRef2.exists && docRef2.data().Lecture === true) {
										fireStore
											.collection("sessions")
											.add({
												answer1: "",
												answer2: "",
												answer3: "",
												answer4: "",
												respondA1: 0,
												respondA2: 0,
												respondA3: 0,
												respondA4: 0,
												revealAnswer: false,
												displayGraph: false,
												currentSliceId: sliceIds[0],
												inClass: collection,
												isCurrentSliceAQuestion: !docRef2.data().Lecture,
												numPolls: 1,
												polling: false,
												question: docRef2.data().Question,
												topic: docRef2.data().Topic,
												difficulty: "",
												sessionPlan: sliceIds,
												sessionStart: new Date(),
												sessionEnd: "",
												sliceHistory: "",
												trueAnswer: "",
												sliceNumber: 1,
												url: "",
												filename: ""
											})
											.then((docRefSession) => {
												fireStore
													.collection("classes")
													.doc(collection)
													.update({
														currSession: docRefSession.id
													})
													.then(() =>
														dispatch({
															type: "SUCCESSFULLY_LOADED",
															classs
														})
													)
													.catch((err) =>
														dispatch({
															type: "UNSUCCESSFULLY_LOADED",
															err
														})
													);
											});
									} else {
										dispatch({
											type: "SLICE_REF_NOT_EXIST"
										});
									}
								}
							});
					} else {
						dispatch({
							type: "PLAN_EMPTY"
						});
					}
				} else {
					dispatch({
						type: "SESSION_PLANS_NOT_EXIST"
					});
				}
			});
	} else {
		dispatch({
			type: "SESSION_PLANS_NOT_EXIST"
		});
	}
};
