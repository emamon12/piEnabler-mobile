export const signIn = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
            dispatch({ type: "LOGIN_SUCCESS" });
        })
        .catch((err) => {
            dispatch({ type: "LOGIN_ERROR", err });
        });
};

export const signOut = (firebase) => (dispatch, getState) => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            dispatch({ type: "SIGNOUT_SUCCESS" });
        });
};

//this signs up new user in firebase's auth
export const signUp = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((resp) =>
            firestore
                .collection("users")
                .doc(resp.user.uid)
                .set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
                    userRole: "student",
                    email: newUser.email
                })
        )
        .then(() => {
            dispatch({ type: "SIGNUP_SUCCESS" });
        })
        .catch((err) => {
            dispatch({ type: "SIGNUP_ERROR", err });
        });
};
