const initState = {};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_ERROR":
            return {
                ...state,
                authError: "Invalid Username or Password"
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                authError: null
            };
        case "SIGNOUT_SUCCESS":
            return state;
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                signUpError: null
            };
        case "SIGNUP_ERROR":
            return {
                ...state,
                signUpError: action.err.message
            };
        default:
            return state;
    }
};

export default authReducer;
