const initState = {}

const sliceReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_SLICE':
            console.log('added slice', action.slices);
            return state;
        case 'ADD_SLICE_ERROR':
            console.log('add slice error', action.err);
            return state;
        case 'CREATE_SLICE':
            console.log('created slice', action.slices);
            return state;
        case 'CREATE_SLICE_ERROR':
            console.log('create slice error', action.err);
            return state;
        default:
            return state;
    }
}

export default sliceReducer