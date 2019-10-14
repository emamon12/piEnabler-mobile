const initState = {
    addClassError: null,
    responseFeedback: null,
};

const classReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_CLASS':
            return {
                ...state,
                addClassError: null,
            };
        case 'ADD_CLASS_ERROR':
            return {
                ...state,
                addClassError: "No Class Found...",
            };
        case 'CREATE_CLASS':
            console.log('create class error', action.classs);
            return state;
        case 'CREATE_CLASS_ERROR':
            console.log('create class error', action.err);
            return state;
        case 'ADD_RESPONSE':
            return {
                ...state,
                responseFeedback: null,
            };
        case 'ADD_RESPONSE_ERROR':
            return {
                ...state,
                responseFeedback: "Could Not Submit Answer, Please Submit Again.",
            };
        case 'CHANGE_MESSAGE':
            console.log('successfully changed message', action.classs);
            return {
                ...state,
                messageErrorFeedback: null,
            };
        case 'CHANGE_MESSAGE_ERROR':
            console.log('unsuccessfully changed message', action.err);
            return {
                ...state,
                messageErrorFeedback: "Error in changing message",
            };
        default:
            return state;
    }
}

export default classReducer