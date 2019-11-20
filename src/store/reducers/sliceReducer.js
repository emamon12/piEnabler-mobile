const initState = {};

const sliceReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_SLICE":
            return {
                ...state,
                addSliceError: null
            };
        case "ADD_SLICE_ERROR":
            return {
                ...state,
                addSliceError: "Unable To Add Slice!"
            };
        case "CREATE_SLICE":
            return {
                ...state,
                createSliceError: null
            };
        case "CREATE_SLICE_ERROR":
            return {
                ...state,
                createSliceError: "Unable To Create Slice!"
            };
        default:
            return state;
    }
};

export default sliceReducer;
