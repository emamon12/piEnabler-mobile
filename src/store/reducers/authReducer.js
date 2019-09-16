const initState = {};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Invalid Username or Password',
            };
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null,
            };
        case 'SIGNOUT_SUCCESS':
            console.log('Successfully signed out');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('Successfully signed up');
            return {
                ...state,
                authError: null,
            };
        case 'SIGNUP_ERROR':
            console.log('Cannot Sign up');
            return {
                ...state,
                authError: action.err.message,
            };
        default:
            return state;
    }
};

export default authReducer;