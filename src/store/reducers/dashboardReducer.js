const initstate = {
    nextUrl: "",
    nextQuestion: "",
    nextTitle: "",
    messageErrorFeedback: null,
    sliceError: null,
    loadingError: null
};

const dashboardReducer = (state = initstate, action) => {
    switch (action.type) {
        case "NEXT_SLICE":
            console.log("incremented slice", action.id);
            return {
                ...state,
                messageErrorFeedback: null
            };
        case "NEXT_SLICE_ERROR":
            return {
                ...state,
                sliceError: "Unable To Increment Slice!"
            };
        case "PREV_SLICE":
            console.log("decremented slice", action.id);
            return {
                ...state,
                messageErrorFeedback: null
            };
        case "PREV_SLICE_ERROR":
            return {
                ...state,
                sliceError: "Unable To Decrement Slice!"
            };
        case "REPOLL":
            console.log("Repolling", action.id);
            return {
                ...state,
                messageErrorFeedback: null
            };
        case "REPOLL_ERROR":
            return {
                ...state,
                sliceError: "Unable To Repoll!"
            };
        case "REVEAL_ANSWER":
            console.log("Revealing Answer", action.id);
            return {
                ...state,
                messageErrorFeedback: null
            };
        case "REVEAL_ANSWER_ERROR":
            return {
                ...state,
                sliceError: "Unable To Reveal!"
            };
        case "DISPLAY_HISTOGRAM":
            console.log("Displaying Histogram", action.id);
            return {
                ...state,
                messageErrorFeedback: null
            };
        case "DISPLAY_HISTOGRAM_ERROR":
            return {
                ...state,
                sliceError: "Unable To Display Histogram!"
            };
        case "CHANGE_DIFFICULTY":
            console.log("changing difficulty", action.id);
            return {
                ...state,
                messageErrorFeedback: null
            };
        case "CHANGE_DIFFICULTY_ERROR":
            return {
                ...state,
                sliceError: "Unable To change difficutly!"
            };
        case "SUCCESSFULLY_UPDATED":
            console.log("session updated", action.id);
            return {
                ...state,
                messageErrorFeedback: null
            };
        case "UNSUCCESSFULLY_UPDATED":
            return {
                ...state,
                sliceError: "Unable To update session!"
            };
        case "CHANGE_POLLING":
            console.log("changing polling status", action.id);
            return {
                ...state,
                messageErrorFeedback: null
            };
        case "CHANGE_POLLING_ERROR":
            return {
                ...state,
                sliceError: "Unable to change polling status!"
            };
        case "GET_NEXT_SLICE":
            console.log(action.pie);

            return {
                ...state,
                nextUrl: action.pie.url,
                nextTitle: action.pie.title,
                nextQuestion: action.pie.question
            };
        default:
            return state;
    }
};

export default dashboardReducer;
