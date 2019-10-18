const initstate = {}

const sessionReducer = (state = initstate, action) => {
    switch (action.type) {
        case 'SUBMIT_PLAN':
            console.log('added plan', action);
            return state;
        case 'SUBMIT_PLAN_ERROR':
            console.log('failure to add plan', action);
            return state;
        default:
            return state;
    }
}

export default sessionReducer