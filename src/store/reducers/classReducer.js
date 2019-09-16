const initState = {}

const classReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_CLASS':
            console.log('added class', action.classs);
            return state;
        case 'ADD_CLASS_ERROR':
            console.log('add class error', action.err);
            return state;
        case 'CREATE_CLASS':
            console.log('create class error', action.classs);
            break;
        case 'CREATE_CLASS_ERROR':
            console.log('create class error', action.err);
            break;
        default:
            return state;
    }
}

export default classReducer