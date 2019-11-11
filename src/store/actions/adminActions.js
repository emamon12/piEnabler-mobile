export const changeRole = (userToChange, role) => (dispatch, getState, { getFirestore }) => {
	const fireStore = getFirestore();

	console.log(userToChange);

	if (userToChange && role) {
		if (role === "student" || role === "admin" || role === "instructor") {
			fireStore
				.collection("users")
				.where("email", "==", userToChange)
				.get()
				.then((docRef) => {
					if (!docRef.empty) {
						docRef.forEach((doc) => {
							fireStore
								.collection("users")
								.doc(doc.id)
								.update({
									userRole: role
								})
								.then(() => {
									dispatch({ type: "ROLE_CHANGE_SUCC" });
								})
								.catch((err) => {
									dispatch({ type: "ROLE_CHANGE_ERR", err });
								});
						});
					} else {
						dispatch({ type: "EMAIL_ERR" });
					}
				})
				.catch((err) => {
					dispatch({ type: "ROLE_CHANGE_ERR", err });
				});
		}
	}
};
