export const createSlice = (slices) => (dispatch, getState, { getFirestore }) => {
  const fireStore = getFirestore();
  const teacherId = getState().firebase.auth.uid;

  fireStore
    .collection("slices")
    .add({
      ...slices,
      createdBy: teacherId,
      createdAt: new Date()
    })
    .then(() =>
      dispatch({
        type: "CREATE_SLICE",
        slices
      })
    )
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        err
      })
    );
};
