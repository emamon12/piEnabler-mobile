const initstate = { sliceError: null };

const sessionReducer = (state = initstate, action) => {
    switch (action.type) {
        case "SUBMIT_PLAN":
            console.log("added plan", action);
            return state;
        case "SUBMIT_PLAN_ERROR":
            console.log("failure to add plan", action);
            return state;
        case "UNION_SLICE":
            return {
                ...state,
                sliceError: null
            };
        case "UNION_SLICE_ERROR":
            return {
                ...state,
                sliceError: "Unable To Add Slice!"
            };
        case "UNION_SLICE_NOT_EXIST":
            return {
                ...state,
                sliceError: "Slice Provided Does Not Exist!"
            };
        case "SUCCESSFULLY_DELETED":
            return {
                ...state,
                sliceError: null
            };
        case "UNSECESSFULLY_DELETED":
            return {
                ...state,
                sliceError: "Slice Could Not Successfully Deleted"
            };
        case "UNABLE_TO_GET":
            return {
                ...state,
                sliceError: "Session Plan Could Not Successfully Get"
            };
        default:
            return state;
    }
};

export default sessionReducer;
