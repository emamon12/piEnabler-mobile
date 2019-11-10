const initstate = {};

const dashboardReducer = (state = initstate, action) => {
	switch (action.type) {
		case "NEXT_SLICE":
			console.log("incremented slice", action.pie);
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
			console.log("decremented slice", action.pie);
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
			console.log("Repolling", action.pie);
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
			console.log("Revealing Answer", action.pie);
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
			console.log("Displaying Histogram", action.pie);
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
			console.log("changing difficulty", action.pie);
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
			console.log("session updated", action.pie);
			return {
				...state,
				messageErrorFeedback: null
			};
		case "UNSUCCESSFULLY_UPDATED":
			return {
				...state,
				sliceError: "Unable To update session!"
			};
		case "SLICE_EMPTY":
			return {
				...state,
				loadingError: "Slice Is Empty...."
			};
		case "SESSION_DNE":
			return {
				...state,
				loadingError: "Session Do Not Exist..."
			};
		case "CHANGE_POLLING":
			console.log("changing polling status", action.pie);
			return {
				...state,
				messageErrorFeedback: null
			};
		case "CHANGE_POLLING_ERROR":
			return {
				...state,
				sliceError: "Unable to change polling status!"
			};
		default:
			return state;
	}
};

export default dashboardReducer;
